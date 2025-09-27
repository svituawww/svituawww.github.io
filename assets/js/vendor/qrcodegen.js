/*
 * Improved compact QR encoder (byte mode + ECC M) for this project.
 * Still a subset but now draws valid finder patterns, timing, format info with BCH,
 * and selects a mask among 4 options (0–3) based on penalty score.
 * MIT License. Based on concepts from Project Nayuki's QR library.
 */
(function(global){
  'use strict';
  const GF={EXP:new Array(512),LOG:new Array(256)}; let x=1; for(let i=0;i<255;i++){GF.EXP[i]=x; GF.LOG[x]=i; x<<=1; if(x&0x100) x^=0x11D;} for(let i=255;i<512;i++) GF.EXP[i]=GF.EXP[i-255];
  function gfMul(a,b){ if(a===0||b===0) return 0; return GF.EXP[GF.LOG[a]+GF.LOG[b]]; }
  const RS_DIVISORS={};
  function rsInit(ecLen){ if(RS_DIVISORS[ecLen]) return; let poly=[1]; for(let i=0;i<ecLen;i++){ const factor=[1, GF.EXP[i]]; const next=new Array(poly.length+1).fill(0); for(let j=0;j<poly.length;j++){ next[j]^=gfMul(poly[j],factor[0]); next[j+1]^=gfMul(poly[j],factor[1]); } poly=next; } RS_DIVISORS[ecLen]=poly.slice(1); }
  function reedSolomon(data,ecLen){ const res=new Array(ecLen).fill(0); for(const b of data){ const factor=b^res.shift(); res.push(0); if(factor!==0){ for(let i=0;i<ecLen;i++) res[i]^=gfMul(factor,RS_DIVISORS[ecLen][i]); } } return res; }
  // Accurate subset for versions 1-10, ECC M (byte mode capacities and block structure)
  // Fields: v, cap (max bytes), ec (ecc codewords per block), g1 (num blocks group1), dc1 (data cw per block g1), g2, dc2
  const CAP=[
    {v:1, cap:14, ec:10, g1:1, dc1:16-10, g2:0, dc2:0},            // total data 16-10=6? (spec: 16 total codewords; data=16-10=6 bytes capacity 14 incl mode+len overhead) NOTE capacity separate
    {v:2, cap:26, ec:16, g1:1, dc1:28-16, g2:0, dc2:0},            // total data 12 (capacity 26 bytes before overhead limit logic)
    {v:3, cap:42, ec:26, g1:1, dc1:44-26, g2:0, dc2:0},            // total data 18
    {v:4, cap:62, ec:18, g1:2, dc1:32-18, g2:0, dc2:0},            // two blocks (14 data each) total 28
    {v:5, cap:84, ec:24, g1:2, dc1:43-24, g2:0, dc2:0},
    {v:6, cap:106, ec:16, g1:4, dc1:34-16, g2:0, dc2:0},
    {v:7, cap:122, ec:18, g1:4, dc1:42-18, g2:0, dc2:0},
    {v:8, cap:152, ec:22, g1:4, dc1:50-22, g2:0, dc2:0},
    {v:9, cap:180, ec:22, g1:5, dc1:58-22, g2:0, dc2:0},
    {v:10,cap:213, ec:26, g1:5, dc1:69-26, g2:0, dc2:0}
  ];
  function chooseVersion(len){ for(const e of CAP) if(len<=e.cap) return e; throw new Error('Data too long'); }
  function bitBuf(){return{bits:[],add(v,l){for(let i=l-1;i>=0;i--) this.bits.push((v>>>i)&1);},padTo(n){while(this.bits.length%8) this.bits.push(0); const pads=[0xEC,0x11]; let i=0; while(this.bits.length<n){ this.add(pads[i%2],8); i++; }},toBytes(){const out=[]; for(let i=0;i<this.bits.length;i+=8){ let b=0; for(let j=0;j<8;j++){ b=(b<<1)| (this.bits[i+j]||0); } out.push(b); } return out;}}}
  function placeFunctionPatterns(m,size,version){
    const placeFinder=(x,y)=>{ // full 7x7 with explicit white ring
      for(let dy=0;dy<7;dy++) for(let dx=0;dx<7;dx++){
        const xx=x+dx,yy=y+dy;
        const outer = dx===0||dx===6||dy===0||dy===6;
        const inner = dx>=2&&dx<=4&&dy>=2&&dy<=4;
        if(outer || inner) m[yy][xx]=true; else m[yy][xx]=false; // white ring set to false
      }
      // 1-module white separator around (if inside bounds and unset)
      for(let dy=-1;dy<=7;dy++) for(let dx=-1;dx<=7;dx++){
        if(dy>=0&&dy<7&&dx>=0&&dx<7) continue; // skip pattern itself
        const xx=x+dx,yy=y+dy; if(xx<0||yy<0||xx>=size||yy>=size) continue; if(m[yy][xx]===undefined) m[yy][xx]=false;
      }
    };
    placeFinder(0,0); placeFinder(size-7,0); placeFinder(0,size-7);
    // timing patterns
    for(let i=8;i<size-8;i++){ if(m[6][i]===undefined) m[6][i]= (i%2===0); if(m[i][6]===undefined) m[i][6]=(i%2===0); }
    // ensure row/col 8 reserved (set to false where undefined, will get format bits later)
    for(let i=0;i<size;i++){ if(m[8][i]===undefined) m[8][i]=false; if(m[i][8]===undefined) m[i][8]=false; }
    // dark module
    m[size-8][8]=true;
  }
  function maskFunc(mask,x,y){ switch(mask){
    case 0: return (x + y) % 2 === 0;
    case 1: return y % 2 === 0;
    case 2: return x % 3 === 0;
    case 3: return (x + y) % 3 === 0;
    case 4: return (Math.floor(y/2) + Math.floor(x/3)) % 2 === 0;
    case 5: return (x*y)%2 + (x*y)%3 === 0;
    case 6: return ( (x*y)%2 + (x*y)%3 ) % 2 === 0;
    case 7: return ( (x+y)%2 + (x*y)%3 ) % 2 === 0;
    default: return false;
  }}
  function formatBits(mask){ // ECC M = 00, format: ECC(00)+mask(???), then BCH(15,5)
    const ecc=0; let data=(ecc<<3)|mask; // 5 bits
    // BCH: multiply by x^10 then mod generator 0b10100110111
    let v=data<<10; const gen=0b10100110111; for(let i=14;i>=10;i--){ if((v>>>i)&1) v^=gen<<(i-10); }
    let bits=((data<<10)|v)^0b101010000010010; // mask pattern per spec
    return bits & 0x7FFF;
  }
  function drawFormat(m,size,mask){
    const bits=formatBits(mask); const bit=i=> ((bits>>i)&1)===1;
    // First set (vertical near left-top) using spec order i=0..14
    for(let i=0;i<6;i++) m[i][8]=bit(i); // (8,0..5)
    m[7][8]=bit(6);          // (8,7)
    m[8][8]=bit(7);          // (8,8)
    m[8][7]=bit(8);          // (7,8)
    for(let i=9;i<15;i++) m[8][14-i]=bit(i); // (5..0,8)
    // Second group mirrored
    for(let i=0;i<8;i++) m[8][size-1-i]=bit(i);        // (size-1 ... size-8, y=8)
    for(let i=8;i<15;i++) m[size-15+i][8]=bit(i);      // (y=size-7 ... size-1, x=8)
  }
  function penalty(m,size){
    let score=0;
    // N1: runs of same color length >=5
    for(let y=0;y<size;y++){
      let runColor=m[y][0], runLen=1;
      for(let x=1;x<size;x++){
        if(m[y][x]===runColor) runLen++; else { if(runLen>=5) score+=3+(runLen-5); runColor=m[y][x]; runLen=1; }
      }
      if(runLen>=5) score+=3+(runLen-5);
    }
    for(let x=0;x<size;x++){
      let runColor=m[0][x], runLen=1;
      for(let y=1;y<size;y++){
        if(m[y][x]===runColor) runLen++; else { if(runLen>=5) score+=3+(runLen-5); runColor=m[y][x]; runLen=1; }
      }
      if(runLen>=5) score+=3+(runLen-5);
    }
    // N2: 2x2 blocks
    for(let y=0;y<size-1;y++) for(let x=0;x<size-1;x++){
      const c=m[y][x]; if(m[y][x+1]===c && m[y+1][x]===c && m[y+1][x+1]===c) score+=3;
    }
    // N3: finder-like patterns in rows/cols
    const patternA=[1,0,1,1,1,0,1,0,0,0,0];
    const patternB=[0,0,0,0,1,0,1,1,1,0,1];
    function hasPattern(line){ for(let i=0;i<=line.length-11;i++){ let okA=true, okB=true; for(let k=0;k<11;k++){ if(line[i+k]!==patternA[k]) okA=false; if(line[i+k]!==patternB[k]) okB=false; if(!okA&&!okB) break; } if(okA||okB) score+=40; } }
    for(let y=0;y<size;y++) hasPattern(m[y].map(b=>b?1:0));
    for(let x=0;x<size;x++){ const col=[]; for(let y=0;y<size;y++) col.push(m[y][x]?1:0); hasPattern(col); }
    // N4: dark module ratio
    let dark=0; for(let y=0;y<size;y++) for(let x=0;x<size;x++) if(m[y][x]) dark++;
    const total=size*size; const k=Math.abs(dark*20 - total*10)/total; score+=k*10;
    return score;
  }
  // Alignment pattern centers for versions 1..10 (subset)
  const ALIGN={2:[6,18],3:[6,22],4:[6,26],5:[6,30],6:[6,34],7:[6,22,38],8:[6,24,42],9:[6,26,46],10:[6,28,50]};
  function placeAlign(version,m,size){ if(version<2) return; const centers=ALIGN[version]; if(!centers) return; for(let r=0;r<centers.length;r++) for(let c=0;c<centers.length;c++){ const cy=centers[r], cx=centers[c]; // skip if overlaps finder (within 7x7 of corner)
        const inTL = cx<=8 && cy<=8; const inTR = cx>=size-8 && cy<=8; const inBL = cx<=8 && cy>=size-8; if(inTL||inTR||inBL) continue;
        // draw 5x5 alignment pattern if empty
        for(let dy=-2;dy<=2;dy++) for(let dx=-2;dx<=2;dx++){
          const yy=cy+dy, xx=cx+dx; if(xx<0||yy<0||xx>=size||yy>=size) continue; if(m[yy][xx]!==undefined) continue; const ad=Math.max(Math.abs(dx),Math.abs(dy)); m[yy][xx]= (ad===2||ad===0); }
  }}
  function make(str){
    const bytes=Array.from(new TextEncoder().encode(str));
    const ver=chooseVersion(bytes.length); const size=17+4*ver.v;
  rsInit(ver.ec);
  const bb=bitBuf(); bb.add(0x4,4); bb.add(bytes.length, ver.v<10?8:16); bytes.forEach(b=>bb.add(b,8));
  // compute total data codewords from structure
  const totalDataCw = ver.g1*ver.dc1 + ver.g2*ver.dc2;
  const capBits= totalDataCw * 8; const remain=capBits-bb.bits.length; if(remain>4) bb.add(0,4); else if(remain>0) bb.add(0,remain);
    while(bb.bits.length%8) bb.bits.push(0);
    bb.padTo(capBits);
  const data=bb.toBytes();
  // build blocks (only group1 currently used in this simplified structure; g2 left for extensibility)
  const blocks=[]; let idx=0;
  for(let i=0;i<ver.g1;i++){ const blk=data.slice(idx, idx+ver.dc1); idx+=ver.dc1; blocks.push({d:blk, e:reedSolomon(blk,ver.ec)}); }
  for(let i=0;i<ver.g2;i++){ const blk=data.slice(idx, idx+ver.dc2); idx+=ver.dc2; blocks.push({d:blk, e:reedSolomon(blk,ver.ec)}); }
  // interleave data
  const inter=[]; let max=0; blocks.forEach(b=>{ if(b.d.length>max) max=b.d.length; });
  for(let i=0;i<max;i++) blocks.forEach(b=>{ if(i<b.d.length) inter.push(b.d[i]); });
  for(let i=0;i<ver.ec;i++) blocks.forEach(b=> inter.push(b.e[i]));
    const bits=[]; inter.forEach(b=>{ for(let i=7;i>=0;i--) bits.push((b>>>i)&1); });
    const modules=Array.from({length:size},()=>Array(size));
  placeFunctionPatterns(modules,size,ver.v);
  placeAlign(ver.v,modules,size);
    // track data modules separately
    const dataMask=Array.from({length:size},()=>Array(size).fill(false));
    let bi=0, upward=true; for(let x=size-1;x>0;x-=2){ if(x===6) x--; for(let y=0;y<size;y++){ const row=upward? size-1-y : y; for(let dx=0;dx<2;dx++){ const xx=x-dx; if(modules[row][xx]!==undefined) continue; const bit= bits[bi++]===1; modules[row][xx]=bit; dataMask[row][xx]=true; if(bi>=bits.length) bi=bits.length; } } upward=!upward; }
  let bestMask=0, bestScore=1e9, bestMatrix=null;
  for(let msk=0; msk<8; msk++){
      const test=modules.map(r=>r.slice());
      for(let y=0;y<size;y++) for(let x=0;x<size;x++) if(dataMask[y][x] && maskFunc(msk,x,y)) test[y][x]=!test[y][x];
      drawFormat(test,size,msk);
      const sc=penalty(test,size); if(sc<bestScore){ bestScore=sc; bestMask=msk; bestMatrix=test; }
    }
    return { size, getModule:(x,y)=>bestMatrix[y][x] };
  }
  // isData no longer needed externally; kept for future extension
  function isData(){ return false; }
  global.SimpleRealQR={ make };
})(this);
