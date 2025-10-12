// Domain configuration constant for easy maintenance
// const DOMAIN_SITE = "svitua.se";
const DOMAIN_SITE = "svituawww.github.io";

/* =============================================================
 * d_uuid Configuration Defaults
 * -------------------------------------------------------------
 * Set ONLY TEXT mode by default so d_uuid is assigned only to
 * elements that are annotated with typeuuid="text".
 * Users can override before calling runTagging() by setting
 * window.D_UUID_ONLY_TEXT_MODE = false.
 * If already defined, we do not overwrite the user value.
 * ============================================================= */
if (typeof window !== 'undefined' && window.D_UUID_ONLY_TEXT_MODE == null) {
	window.D_UUID_ONLY_TEXT_MODE = true; // default enabled
    window.D_UUID_SKIP_STRIP_TYPEUUID = false; // default disabled
}


/* =============================================================
 * d_uuid Document Tagging & Reconstruction Utility
 * Implements instruction (inst_6 id_part2):
 *  - Traverse <head> and <body>
 *  - Ensure every element has 10-char base36 lowercase `d_uuid`
 *  - Deterministic where possible; reuse existing valid d_uuid
 *  - Build full HTML string and copy to clipboard
 *  - Expose window.D_UUID_INDEX { d_uuid -> element }
 * ============================================================= */

(function(){
	const DUUID_ATTR = 'd_uuid';
	const VALID_RE = /^[a-z0-9]{10}$/;
	const INDEX = Object.create(null);
	const collisions = new Set();
	let newlyAssigned = 0;
	let reused = 0;	

	// // Simple Fowler–Noll–Vo (FNV-1a) hash for deterministic id seeds
	// function fnv1a(str){
	// 	let h = 0x811c9dc5;
	// 	for(let i=0;i<str.length;i++){
	// 		h ^= str.charCodeAt(i);
	// 		h = (h >>> 0) * 0x01000193;
	// 	}
	// 	return (h >>> 0).toString(36); // base36
	// }

	function fnv1aBytes(str){
      const bytes = new TextEncoder().encode((str ?? '').normalize('NFKC'));
      let h = 0x811c9dc5 >>> 0;
      for (const b of bytes) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
      return h >>> 0; // uint32
    }

    function hash10FromText(str){
      const a = fnv1aBytes(str);
      const b = fnv1aBytes(a.toString(36) + '|' + (str?.length ?? 0));
      return (a.toString(36) + b.toString(36)).replace(/[^a-z0-9]/g,'').slice(0,10).padEnd(10,'0');
    }

	function randomId(){
		return Math.random().toString(36).slice(2, 12).padEnd(10,'0').slice(0,10);
	}

	// Build a structural path like: head/0/meta[2] or body/3/div[1]/span[0]
	function elementIndexPath(el){
		const parts = [];
		while(el && el.nodeType === 1 && el !== document.documentElement){
			const parent = el.parentElement;
			if(!parent) break;
			const tag = el.tagName.toLowerCase();
			const siblings = Array.from(parent.children).filter(c => c.tagName === el.tagName);
			const idx = siblings.indexOf(el);
			parts.push(`${tag}[${idx}]`);
			el = parent;
		}
		return parts.reverse().join('/');
	}

	function generateDeterministicId(el){
		//const basis = el.tagName.toLowerCase() + '|' + elementIndexPath(el);
		//let hash = fnv1a(basis).replace(/[^a-z0-9]/g,'');
		const basis = el.outerHTML.toLowerCase();
		let hash = hash10FromText(basis).replace(/[^a-z0-9]/g,'');
		if(hash.length < 10) hash = (hash + randomId()).slice(0,10);
		return hash.slice(0,10);
	}

	function ensureId(el){
		let existing = el.getAttribute(DUUID_ATTR);
		if(existing && VALID_RE.test(existing) && !INDEX[existing]){
			INDEX[existing] = el; reused++; return existing;
		}
		// Need new id
		let id = generateDeterministicId(el);
		// Collision handling
		while(INDEX[id]){ collisions.add(id); id = randomId(); }
		el.setAttribute(DUUID_ATTR, id);
		INDEX[id] = el; newlyAssigned++; return id;
	}

	function traverseElements(){
		const ordered = [];
		const pushChildren = (root) => {
			if(!root) return;
				const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null);
				let node;
			while((node = walker.nextNode())){
				ordered.push(node);
			}
		};
		// Include <html> itself first
		ordered.push(document.documentElement);
		pushChildren(document.head);
		pushChildren(document.body);
		return ordered;
	}

	function serializeElement(el){
		const tag = el.tagName.toLowerCase();
		const voidTags = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
		const attrs = Array.from(el.attributes).map(a => `${a.name}="${a.value.replace(/"/g,'&quot;')}"`).join(' ');
		if(voidTags.has(tag)){
			return `<${tag}${attrs? ' '+attrs:''}>`;
		}
		return `<${tag}${attrs? ' '+attrs:''}>${el.innerHTML}</${tag}>`;
	}

	function rebuildHTML(docEl){
		// Reconstruct DOCTYPE if present
		const dt = document.doctype;
		const doctypeStr = dt ? `<!DOCTYPE ${dt.name}${dt.publicId ? ` PUBLIC "${dt.publicId}"` : ''}${dt.systemId ? ` "${dt.systemId}"` : ''}>\n` : '';
		return doctypeStr + serializeElement(docEl);
	}

	function copyToClipboard(text){
		if(navigator.clipboard && navigator.clipboard.writeText){
			return navigator.clipboard.writeText(text).catch(()=>fallback(text));
		}
		return Promise.resolve(fallback(text));
	}
	function fallback(text){
		const ta = document.createElement('textarea');
		ta.style.position='fixed'; ta.style.opacity='0';
		ta.value = text; document.body.appendChild(ta); ta.select();
		try{ document.execCommand('copy'); }catch(_e){}
		ta.remove();
	}

	function buildIndexAndOutput(){
		const elements = traverseElements();
		const total = elements.length;

		// Pre-annotation BEFORE assigning ids so we can optionally restrict id assignment only to text owners.
		(function preAnnotateDirectText(){
			if(window.D_UUID_AUTO_TEXT_ANNOTATE === false) return; // allow disabling
			let annotated = 0;
			for(const el of elements){
				const tag = el.tagName.toLowerCase();
				if(['script','style'].includes(tag)) continue;
				let hasDirectText = false;
				for(const n of el.childNodes){
					if(n.nodeType === 3 && n.nodeValue && n.nodeValue.trim()){ hasDirectText = true; break; }
				}
				if(!hasDirectText) continue;
				if(el.hasAttribute('typuuid')) el.removeAttribute('typuuid');
				if(!el.hasAttribute('typeuuid')){ el.setAttribute('typeuuid','text'); annotated++; }
			}
			window.D_UUID_TEXT_ANNOTATED_COUNT = annotated;
		})();

		// Flag: when true, assign d_uuid ONLY to elements already annotated as text owners (typeuuid="text").
		// Usage: set window.D_UUID_ONLY_TEXT_MODE = true before calling runTagging(). Default false (assign all elements).
		const onlyTextMode = window.D_UUID_ONLY_TEXT_MODE === true;
		let eligible = 0;
		for(const el of elements){
			if(onlyTextMode && !el.hasAttribute('typeuuid')) continue; // skip non-text elements in restricted mode
			ensureId(el);
			eligible++;
		}
		// Force apply typuuid="text" for specific known d_uuid targets before export
		(function ensureSpecificTypeUUID(){
			try {
				const targetIds = Array.isArray(window.D_UUID_FORCE_TEXT_IDS) ? window.D_UUID_FORCE_TEXT_IDS : ['3nnf1cihcr'];
				targetIds.forEach(id => {
					const el = document.querySelector(`[d_uuid="${id}"]`);
					if(!el) return;
					if(el.hasAttribute('typuuid')) el.removeAttribute('typuuid');
					if(!el.hasAttribute('typeuuid')) el.setAttribute('typeuuid','text');
				});
			} catch(e){ console.warn('[d_uuid] typuuid force failed', e); }
		})();

		// Build JSON export of text-owner elements (direct text nodes only) preserving traversal order
		(function buildTextJSON(){
			try {
				const out = [];
				for(const el of elements){
					// Qualify: must have typeuuid="text" OR at least one direct non-whitespace text node

					if(!el.hasAttribute('typeuuid')){
						let hasDirect=false;
						for(const n of el.childNodes){ if(n.nodeType===3 && n.nodeValue && n.nodeValue.trim()){ hasDirect=true; break; } }
						if(!hasDirect) continue;
					}
					const id = el.getAttribute('d_uuid');
					if(!id) continue; // skip if no id (possible when onlyTextMode true & not qualified)
					// Concatenate ONLY direct text nodes
					const parts = [];
					for(const n of el.childNodes){
						if(n.nodeType===3){
							const v = n.nodeValue.trim();
							if(v) parts.push(v);
						}
					}
					if(!parts.length) continue; // no direct text content after trim
					out.push({ d_uuid: id, content_uk: parts.join(' '), content_en: "", content_sv: "" }); // content_en empty for translation
				}
				window.D_UUID_TEXT_ARRAY = out;
				// Pretty print JSON by default (2-space indent) unless explicitly disabled via window.D_UUID_PRETTY_JSON=false
				const pretty = window.D_UUID_PRETTY_JSON !== false;
				window.D_UUID_TEXT_JSON = pretty ? JSON.stringify(out, null, 2) + '\n' : JSON.stringify(out);
			} catch(e){ console.warn('[d_uuid] build text json failed', e); }
		})();

		// Optionally remove all typeuuid attributes after JSON extraction
		(function stripTypeUUIDAttributes(){
			try {
				if(window.D_UUID_SKIP_STRIP_TYPEUUID === true) return; // allow opting out
				for(const el of elements){
					if(el.hasAttribute && el.hasAttribute('typeuuid')){
						el.removeAttribute('typeuuid');
					}
				}
				window.D_UUID_TYPEUUID_STRIPPED = true;
			} catch(e){ console.warn('[d_uuid] strip typeuuid failed', e); }
		})();
        //

		// Clone documentElement to safely remove excluded nodes (e.g., copy button)
		const excludeId = window.D_UUID_EXCLUDE_ID || 'd_uuid_copy_btn';
		const clone = document.documentElement.cloneNode(true);
		const btnClone = clone.querySelector('#' + CSS.escape(excludeId));
		if(btnClone){
			btnClone.remove();
		}
		// Remove JSON copy button if present
		const jsonBtnClone = clone.querySelector('#d_uuid_copy_json_btn');
		if(jsonBtnClone){ jsonBtnClone.remove(); }
		// Also remove any transient confirmation notes that might linger (heuristic)
		clone.querySelectorAll('[data-duuid-transient], .d_uuid_transient').forEach(n=>n.remove());
		// Serialize from the cleaned clone
		const inner = (function(){
			// Reconstruct doctype manually (cannot access via clone)
			const dt = document.doctype;
			const doctypeStr = dt ? `<!DOCTYPE ${dt.name}${dt.publicId?` PUBLIC "${dt.publicId}"`:''}${dt.systemId?` "${dt.systemId}"`:''}>\n` : '';
			const htmlTag = clone.outerHTML; // clone already includes <html> subtree
			return doctypeStr + htmlTag;
		})();
		window.D_UUID_INDEX = INDEX;
		window.D_UUID_EXPORT = inner;
		window.D_UUID_LAST_LENGTH = inner.length;
		const summary = {
			totalElements: total,
			eligibleElements: eligible,
			onlyTextMode,
			newlyAssigned,
			reused,
			collisionsResolved: collisions.size,
			excludedId: excludeId,
			exportLength: inner.length
		};
		if(!window.__D_UUID_LAST_SUMMARY || window.__D_UUID_LAST_SUMMARY.exportLength !== summary.exportLength || window.__D_UUID_LAST_SUMMARY.totalElements !== summary.totalElements){
			console.log('[d_uuid summary]', summary);
			window.__D_UUID_LAST_SUMMARY = summary;
		}
		return inner;
	}

	// Expose a public trigger; avoid auto-run unless desired.
	window.runTagging = buildIndexAndOutput;
})();

// To execute manually in console: runTagging();

/* =============================================================
 * Dynamic Copy / Export Button (implements inst_1 id_part2 Task 1)
 * ============================================================= */
(function(){
	function ensureReady(fn){
		if(document.readyState === 'loading'){
			document.addEventListener('DOMContentLoaded', fn, { once: true });
		} else { fn(); }
	}

	function createButton(opts){
		const existing = document.getElementById('d_uuid_copy_btn');
		if(existing) return existing;
		const btn = document.createElement('div');
		btn.id = 'd_uuid_copy_btn';
		btn.setAttribute('role','button');
		btn.setAttribute('tabindex','0');
		btn.setAttribute('aria-label', opts.label || 'Copy tagged HTML');
		btn.textContent = opts.label || 'Copy HTML';
		btn.style.cssText = `
			position:fixed;${computePosition(opts.position || 'top-left')}
			background:#1e293b;color:#fff;font:12px/1.2 system-ui,Arial,sans-serif;
			padding:6px 10px;border-radius:6px;cursor:pointer;z-index:9999;
			box-shadow:0 2px 6px rgba(0,0,0,.28);user-select:none;
			opacity:.85;transition:opacity .2s;
		`;
		btn.addEventListener('mouseenter',()=>btn.style.opacity='1');
		btn.addEventListener('mouseleave',()=>btn.style.opacity='.85');

		const activate = () => {
			if(typeof window.runTagging !== 'function'){
				btn.style.background = '#64748b';
				console.warn('[d_uuid] runTagging function not found');
				return;
			}
			// Set exclusion id globally before export
			window.D_UUID_EXCLUDE_ID = opts.excludeId || 'd_uuid_copy_btn';
			const html = window.runTagging();
			(navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(html) : Promise.resolve(fallbackCopy(html)))
				.catch(()=>fallbackCopy(html));
			showConfirm(btn, opts.confirmDurationMs || 1200);
		};
		btn.addEventListener('click', activate);
		btn.addEventListener('keydown', e => {
			if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); activate(); }
		});
		document.body.appendChild(btn);

		// Create JSON button adjacent (offset horizontally)
		const jsonBtn = document.createElement('div');
		jsonBtn.id = 'd_uuid_copy_json_btn';
		jsonBtn.setAttribute('role','button');
		jsonBtn.setAttribute('tabindex','0');
		jsonBtn.setAttribute('aria-label', 'Copy tagged Text JSON');
		jsonBtn.textContent = 'Copy JSON';
		jsonBtn.style.cssText = btn.style.cssText + 'transform:translateX(100%);margin-left:6px;';
		const activateJSON = () => {
			if(typeof window.runTagging === 'function' && (!window.D_UUID_TEXT_JSON || !window.D_UUID_INDEX)){
				window.runTagging(); // generate if not present
			}
			const json = window.D_UUID_TEXT_JSON || '[]';
			(navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(json) : Promise.resolve(fallbackCopy(json)))
				.catch(()=>fallbackCopy(json));
			showConfirm(jsonBtn, (opts && opts.confirmDurationMs) || 1200);
		};
		jsonBtn.addEventListener('click', activateJSON);
		jsonBtn.addEventListener('keydown', e => { if(e.key==='Enter' || e.key===' '){ e.preventDefault(); activateJSON(); } });
		document.body.appendChild(jsonBtn);
		return btn;
	}

	function computePosition(pos){
		switch(pos){
			case 'bottom-left': return 'left:14px;bottom:14px;';
			case 'top-right': return 'right:14px;top:14px;';
			case 'top-left': return 'left:14px;top:14px;';
			default: return 'right:14px;bottom:14px;';
		}
	}

	function fallbackCopy(text){
		const ta = document.createElement('textarea');
		ta.style.position='fixed'; ta.style.opacity='0';
		ta.value = text; document.body.appendChild(ta); ta.select();
		try{ document.execCommand('copy'); }catch(_e){}
		ta.remove();
	}

	function showConfirm(anchor, duration){
		const note = document.createElement('div');
		note.textContent = 'Copied';
		note.style.cssText = `
			position:absolute;left:50%;top:-6px;transform:translate(-50%,-100%);
			background:#10b981;color:#fff;font:11px/1 system-ui,Arial,sans-serif;
			padding:4px 8px;border-radius:4px;pointer-events:none;
			box-shadow:0 2px 4px rgba(0,0,0,.25);opacity:0;transition:opacity .18s;
		`;
		anchor.appendChild(note);
		requestAnimationFrame(()=>{ note.style.opacity='1'; });
		setTimeout(()=>{ note.style.opacity='0'; setTimeout(()=>note.remove(), 200); }, duration);
	}

	window.enableDUUIDCopyButton = function(options){
		ensureReady(()=>{
			window.D_UUID_EXCLUDE_ID = (options && options.excludeId) || 'd_uuid_copy_btn';
			createButton(options || {});
		});
	};

	// Auto initialize with defaults.
	window.enableDUUIDCopyButton();
})();

/* =============================================================
 * Text Ownership & Language/Digit Detection Utilities
 * Implements instruction (inst_2 id_part2):
 *  - findTextOwners / findDeepestOwner / findLastOwner
 *  - isAllowedLangText classification (Ukrainian, English, Swedish, digits)
 *  - Adds attribute typuuid="text" to each matched owner element
 * ============================================================= */
(function(){
	// --- Language / digit classification ----------------------------------
	function isAllowedLangText(text){
		if(text == null) text = '';
		const rejectedChars = [];
		let hasUkr=false, hasEn=false, hasSv=false, hasLetterOrDigit=false;
		const allowedPunct = new Set([' ','.',',',':',';','!','?','-','(',')','+','\'','’']);
		for(const ch of text){
			const code = ch.codePointAt(0);
			if(code >= 48 && code <= 57){ // 0-9
				hasLetterOrDigit = true; continue;
			}
			if(/[A-Za-z]/.test(ch)){ hasEn = true; hasLetterOrDigit = true; continue; }
			if(/[ÅÄÖåäö]/.test(ch)){ hasSv = true; hasLetterOrDigit = true; continue; }
			// Ukrainian Cyrillic (basic range + specific letters) — exclude typical Russian-only letters if needed
			if(/[А-ЩЬЮЯЇІЄҐа-щьюяїієґ]/.test(ch)){ hasUkr = true; hasLetterOrDigit = true; continue; }
			if(allowedPunct.has(ch)) continue;
			// Allowed apostrophe variations already covered. Everything else is rejected.
			rejectedChars.push(ch);
		}
		const valid = rejectedChars.length === 0 && hasLetterOrDigit;
		return { valid, hasUkr, hasEn, hasSv, rejectedChars };
	}

	// --- Helper functions for ownership metadata -------------------------
	function getDepth(el){
		let d=0; while(el && el.parentElement){ d++; el = el.parentElement; } return d;
	}
	function cssPath(el){
		if(!el) return '';
		const parts = [];
		while(el && el.nodeType === 1 && el !== document.documentElement){
			let part = el.tagName.toLowerCase();
			if(el.id) part += '#' + el.id;
			const du = el.getAttribute('d_uuid');
			if(du) part += `[d_uuid="${du}"]`;
			parts.unshift(part);
			el = el.parentElement;
		}
		parts.unshift('html');
		return parts.join(' > ');
	}

	// --- Core text owner finder -----------------------------------------
	function findTextOwners(target, { exact=true, contains=false, root=document, augmentLanguage=false } = {}){
		if(!target) return [];
		const out = [];
		const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
			acceptNode(node){
				if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
				const t = node.nodeValue.trim();
				if(exact && t === target) return NodeFilter.FILTER_ACCEPT;
				if(!exact && contains && t.includes(target)) return NodeFilter.FILTER_ACCEPT;
				return NodeFilter.FILTER_SKIP;
			}
		});
		while(walker.nextNode()){
			const tn = walker.currentNode;
			const el = tn.parentElement; if(!el) continue;
			// Normalize to single attribute typeuuid="text"
			if(el.hasAttribute('typuuid')) el.removeAttribute('typuuid');
			if(!el.hasAttribute('typeuuid')) el.setAttribute('typeuuid','text');
			const record = {
				element: el,
				tag: el.tagName.toLowerCase(),
				d_uuid: el.getAttribute('d_uuid') || null,
				textNodeValue: tn.nodeValue.trim(),
				depth: getDepth(el),
				cssPath: cssPath(el)
			};
			if(augmentLanguage){
				record.langFlags = isAllowedLangText(record.textNodeValue);
			}
			out.push(record);
		}
		return out;
	}

	function findDeepestOwner(target, opts){
		const owners = findTextOwners(target, { ...(opts||{}), exact:true });
		if(!owners.length) return null;
		return owners.reduce((a,b)=> b.depth > a.depth ? b : a);
	}
	function findLastOwner(target, opts){
		const owners = findTextOwners(target, { ...(opts||{}), exact:true });
		return owners.length ? owners[owners.length-1] : null;
	}

	// --- Expose public API ------------------------------------------------
	window.isAllowedLangText = isAllowedLangText;
	window.findTextOwners = findTextOwners;
	window.findDeepestOwner = findDeepestOwner;
	window.findLastOwner = findLastOwner;
})();
