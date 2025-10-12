function MainFunc() {  
  build_ExpImpForTrans_MainUI();
  ExpImpForTrans_loadDataToHTML();  
}


function build_ExpImpForTrans_MainUI(){

  RemoveAllStylesExpImpForTrans();
  ExpImpForTrans_createStyles();
  ExpImpForTrans_createStyles_2();

  // Clear body
  document.body.innerHTML = '';

  // // Header
  // const header = document.createElement('div');
  // header.id = 'header1';
  // document.body.appendChild(header);  

  // Top controls
  const controlDivTop = document.createElement('div');
  controlDivTop.id = 'control_div';  
  controlDivTop.innerHTML = `  
  `;

  // Top controls
  const controlDivTop2 = document.createElement('div');  
  controlDivTop2.id = 'control_div_top2';
  controlDivTop2.innerHTML = `  
  `;

  document.body.appendChild(controlDivTop);
  document.body.appendChild(controlDivTop2);

  // Info
  const infoDiv = document.createElement('div');
  infoDiv.id = 'info_div';
  document.body.appendChild(infoDiv);


  build_Button_CopyJsonToClipboardUI();


  //build_forall_MainUI(document.body);
}

function build_Button_CopyJsonToClipboardUI(){
  const controlDivTop = document.getElementById('control_div');
  if(!controlDivTop) return;
  const button = document.createElement('button');
  button.textContent = 'Copy JSON to Clipboard';
  button.onclick = function() {
    jsonClipB = [];
    for (let i = 0; i < window.for_trans_data.length; i++) {
      let item = window.for_trans_data[i];      
      const translationFrom = window.CONTENT_DATA_JSON.translationFrom || "uk";
      const translationTo = window.CONTENT_DATA_JSON.translationTo || "en";
      if (translationFrom === "uk" && translationTo === "en") {
        let el1 = { 
           d_uuid: item.d_uuid,
           content_uk: item.content,
           content_en: item.sentence_to || ""
        };
        jsonClipB.push(el1);
      }                 
    
    }
    const jsonData = JSON.stringify(jsonClipB, null, 2);    
    navigator.clipboard.writeText(jsonData).then(() => {
      alert('JSON copied to clipboard');
    });
  };
  controlDivTop.appendChild(button);
}



function ExpImpForTrans_createStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    #header1 {
      background-color: #f0f0f0;
      padding: 10px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      margin-top: 50px;
    }
    #control_div_top2 {
        display: flex;        
        margin-top: 40px;
        margin-bottom: 20px;
    }
    .button_controlsentences_copy {
        background: #1e90ff;
        color: #fff;
        border: none;
        min-height: 30px;
        border-radius: 7px;
        padding: 12px 28px;
        font-size: 18px;
        font-weight: 600;
        margin: 12px 20px 12px 20px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(30,144,255,0.08);
        transition: background 0.2s, box-shadow 0.2s;
        display: inline-block;
        letter-spacing: 0.5px;    
    }
    .button_control_transl {
      background: #1e90ff;
      color: #fff;
      border: none;
      min-height: 30px;
      border-radius: 7px;
      padding: 12px 28px;
      font-size: 26px;
      font-weight: 600;
      margin: 12px 20px 12px 20px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(30,144,255,0.08);
      transition: background 0.2s, box-shadow 0.2s;
      display: inline-block;
      letter-spacing: 0.5px;
    }
    .button_controlsentences_copy:hover {
        background: #1c86ee;
        box-shadow: 0 4px 16px rgba(30,144,255,0.2);
    }
       .button_control_transl_on { 
        background: rgb(205, 50, 50);
        color: #fff;
    }

    
  `;
  document.head.appendChild(style);
}
