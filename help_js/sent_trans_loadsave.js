


function ExpImpForTrans_loadDataToHTML() {
   ExpImpForTrans_Sentence_loadDataToHTML();  
}

function Click_SetModeCollectedWords(athis) {
  const mode1 = athis.className.includes('button_control_transl_on') ? true : false;
  if (!mode1) {
    athis.className = 'button_control_transl button_control_transl_on';
  }
  else {
    athis.className = 'button_control_transl';
  }
  ExpImpForTrans_Sentence_loadDataToHTML(); 
}


function testOnUkrainianLanguage(sentence1) {
    // Check if the sentence contains any Ukrainian characters, if minimum one character then true
    const ukrainianPattern = /[А-Яа-яЁёІіЇїЄєҐґ]/;
    return ukrainianPattern.test(sentence1);
}

function testOnEnglishLanguage(sentence1) {
    // Check if the sentence contains any English characters, if minimum one character then true
    const englishPattern = /[A-Za-z]/;
    return englishPattern.test(sentence1);
}

function testOnSwedishLanguage(sentence1) {
    // Check if the sentence contains any Swedish characters, if minimum one character then true
    // add also english characters using for writing swedish words
    const swedishPattern = /[ÅåÄäÖöA-Za-z]/; 
    return swedishPattern.test(sentence1);
}


function transformData() {
    var content_data = window.CONTENT_DATA_JSON.content_data;
    const translationFrom = window.CONTENT_DATA_JSON.translationFrom || "uk";
    const translationTo = window.CONTENT_DATA_JSON.translationTo || "en";
    output_data = [];
    var el1 = {};   

    for (var i = 0; i < content_data.length; i++) {
        var item = content_data[i];
        var d_uuid = item.d_uuid;
        var content = item.content;
        var idx = i + 11;
        // if (translationFrom === "uk") {
        //     if (testOnUkrainianLanguage(content)) {
        //         el1.needs_translation = true;                
        //     }
        // }
        // else if (translationFrom === "en") {
        //     if (testOnEnglishLanguage(content)) {
        //         el1.needs_translation = true;                
        //     }
        // }
        // else if (translationFrom === "sv") {
        //     if (testOnSwedishLanguage(content)) {
        //         el1.needs_translation = true;                
        //     }
        // }
        el1 = {
            "idsentence": idx,
            "d_uuid": d_uuid,
            "content": content,
            "sentence_from": content,
            "sentence_to": "",
            "needs_translation": true
        };
        output_data.push(el1);
    }

   return output_data;
}

function displayBigSmall_sentencesFromBlock(id_block, valSize) {
    let sentencesFromBlock = document.getElementById(`sentences-fromblock-${id_block}`);
    if (!sentencesFromBlock) {
        console.error(`Element with id sentences-fromblock-${id_block} not found.`);
        return;
    }
    const minSize1 = '30px';
    if (valSize < 1){
        // Collapse to 30px with scroll
        sentencesFromBlock.style.minHeight = minSize1;
        sentencesFromBlock.style.maxHeight = '30px';
        sentencesFromBlock.style.overflowY = 'auto';
    } else {
        // Expand fully (keep min-height)
        sentencesFromBlock.style.minHeight = minSize1;
        sentencesFromBlock.style.removeProperty('max-height');
        sentencesFromBlock.style.overflowY = 'visible';
    }
}



function onclick_sentencesFromBlock(id_block) {
    let sentencesFromBlock = document.getElementById(`sentences-fromblock-${id_block}`);
    if (!sentencesFromBlock) {
        console.error(`Element with id sentences-fromblock-${id_block} not found.`);
        return;
    }
    const minSize1 = '30px';
    // Toggle collapse/expand based on current maxHeight
    const isCollapsed = sentencesFromBlock.style.maxHeight === '30px';
    if (!isCollapsed) {
        // Collapse
        sentencesFromBlock.style.minHeight = minSize1;
        sentencesFromBlock.style.maxHeight = '30px';
        sentencesFromBlock.style.overflowY = 'auto';
    } else {
        // Expand
        sentencesFromBlock.style.minHeight = minSize1;
        sentencesFromBlock.style.removeProperty('max-height');
        sentencesFromBlock.style.overflowY = 'visible';
    }    
}


function onclick_sentencesToBlock(id_block) {
    let sentencesToBlock = document.getElementById(`sentences-to-block-${id_block}`);
    if (!sentencesToBlock) {
        console.error(`Element with id sentences-to-block-${id_block} not found.`);
        return;
    }
    const minSize1 = '30px';
    // Toggle collapse/expand based on current maxHeight
    const isCollapsed = sentencesToBlock.style.maxHeight === '30px';
    if (!isCollapsed) {
        // Collapse
        sentencesToBlock.style.minHeight = minSize1;
        sentencesToBlock.style.maxHeight = '30px';
        sentencesToBlock.style.overflowY = 'auto';
    } else {
        // Expand
        sentencesToBlock.style.minHeight = minSize1;
        sentencesToBlock.style.removeProperty('max-height');
        sentencesToBlock.style.overflowY = 'visible';
    }
}



function hideAllBlocksInFrame(id_block){
    function hideitemBlock(vdiv1){
        if(vdiv1){
            const minSize1 = '30px';
            vdiv1.style.minHeight = minSize1;
            vdiv1.style.maxHeight = '30px';
            vdiv1.style.overflowY = 'auto';
        }
    }
    let div1 = document.getElementById(`sentences-to-block-${id_block}`);
    if(div1){
        hideitemBlock(div1);
    }
}


function ExpImpForTrans_Sentence_loadDataToHTML() {

    window.for_trans_data = transformData();   

    const countSentences = 25;

    let tr_sentences = [];

    for (let i = 0; i < window.for_trans_data.length; i++) {
        let sentence = window.for_trans_data[i];
        if (sentence.needs_translation) {
            tr_sentences.push({
                idsentence: sentence.idsentence,
                sentence_from: sentence.sentence_from,
                sentence_to: sentence.sentence_to
            });
        }
    }

    // Create the HTML structure

    const  infoDiv = document.getElementById('info_div');
    infoDiv.innerHTML = ''; // Clear previous content
    let article_name = "Translation Data";
    infoDiv.innerHTML = `
        <h3>${article_name}</h3>
    `;

    if (tr_sentences.length === 0) {
        infoDiv.innerHTML += `<p>No sentences without translation found.</p>`;
        return;
    }

    // Extract every countSentences portion in one div block with copy button to clipboard

    for (let i = 0; i < tr_sentences.length; i += countSentences) {
        //let containerUI_Block = document.createElement('div');
        //containerUI_Block.className = 'containerUI_Block';
        //infoDiv.appendChild(containerUI_Block);

        let id_block = Math.floor(i / countSentences);

        let divFrame_item = document.createElement('div');
        divFrame_item.className = 'frame_item';
        divFrame_item.id = `frame_item-${id_block}`;
        //containerUI_Block.appendChild(divFrame_item);
        infoDiv.appendChild(divFrame_item);

        let sentencesFromBlock = document.createElement('div');
        sentencesFromBlock.className = 'sentences-fromblock';        
        sentencesFromBlock.id = `sentences-fromblock-${id_block}`;
        sentencesFromBlock.onclick = function(){
            onclick_sentencesFromBlock(id_block);
        }



        for (let j = i; j < i + countSentences && j < tr_sentences.length; j++) {
            let sentence = tr_sentences[j];
            let begin_delimeter_sentences = '352725_' + sentence.idsentence;
            let end_delimeter_sentences = '973524_';
            sentencesFromBlock.innerHTML += `
                <div class="sentence-item" id="sentence-${sentence.idsentence}">                    
                    <span class="sentence-en">${begin_delimeter_sentences} ${sentence.sentence_from} ${end_delimeter_sentences}</span>
                </div>
            `;
        }

        // Add copy button
        let copyButton = document.createElement('button');
        copyButton.textContent = 'Copy to Clipboard ';
        copyButton.className = 'button_controlsentences_copy';
        copyButton.setAttribute('valueid', `sentences-fromblock-${id_block}`);        
        copyButton.onclick = function() {
            const allcopyButtons = document.querySelectorAll('.button_controlsentences_copy');
            // Reset all buttons text to "Copy to Clipboard"
            allcopyButtons.forEach(btn => {
                btn.textContent = 'Copy to Clipboard';
            });
            let valueid = this.getAttribute('valueid');
            let sentencesBlock1 = document.getElementById(valueid);
            if (!sentencesBlock1) {
                console.error(`Element with id ${valueid} not found.`);
                return;
            }
            let TextToCopy1 = sentencesBlock1.innerText;
            // change button text to "Copied!" for 2 seconds
            this.textContent = 'Copied';
            TextArea_copyToClipboard(TextToCopy1);          
        };        

        let parseButton = document.createElement('button');
        parseButton.textContent = 'Parse input';
        parseButton.setAttribute('to_valueid', `sentences-to-block-${id_block}`);
        parseButton.className = 'button_controlsentences';
        parseButton.onclick = function() {
            let textareaB1 = document.getElementById(`textareaB1-${id_block}`);
            textareaB1.style.display = 'block'; // Show the textarea
            let sentencesToBlock = document.getElementById(this.getAttribute('to_valueid'));
            if (!sentencesToBlock) {
                console.error(`Element with id ${this.getAttribute('to_valueid')} not found.`);
                return;
            }
            if (!textareaB1) {
                console.error(`Textarea with id textareaB1-${id_block} not found.`);
                return;
            }
            textareaB1.focus();             
            textareaB1.select(); 

            sentencesToBlock.innerHTML = ''; // Clear previous phrases

            let text_1 = textareaB1.value;
            let sentences = text_1.split('973524_');
            sentences.forEach(sentence => {
                let trimmedSentence = sentence.trim();
                trimmedSentence = trimmedSentence.replace('\n', '');
                if (trimmedSentence) { // Check if sentence is not empty
                    // extract the id from the sentence
                    let idsentenceMatch = trimmedSentence.match(/352725_(\d+)/); // Match the id at the beginning
                    const item_sentencesToBlock = document.createElement('div');
                    item_sentencesToBlock.className = 'item-sentences-to-block';

                    if (idsentenceMatch) {
                        let idSentence = idsentenceMatch[1]; // Get the matched id
                        trimmedSentence = trimmedSentence.replace(/352725_\d+ /, ''); // Remove the id from the sentence

                        let sentenceDiv = document.createElement('div');
                        sentenceDiv.className = 'sentence-paste-to-item';
                        sentenceDiv.id = `sentence-paste-${idSentence}`;
                        sentenceDiv.setAttribute('idsentence', idSentence);
                        sentenceDiv.textContent = trimmedSentence;            
                        item_sentencesToBlock.appendChild(sentenceDiv);

                        let sentence_ToDiv = document.createElement('div');
                        sentence_ToDiv.className = 'sentence-paste-to-item_dest';
                        sentence_ToDiv.id = `sentence-paste-${idSentence}`;
                        sentence_ToDiv.setAttribute('idsentence', idSentence);        
                        const inx1 = tr_sentences.findIndex(p => p.idsentence == idSentence);
                        const sentence_from = tr_sentences[inx1].sentence_from;
                        sentence_ToDiv.textContent = sentence_from;
                        item_sentencesToBlock.appendChild(sentence_ToDiv);

                        sentencesToBlock.appendChild(item_sentencesToBlock);
                    }

                }
            });

            // Show the save button
            let saveToBaseButton = document.getElementById(`button-save-to-db-${id_block}`);
            if (saveToBaseButton) {
                if (sentencesToBlock.childElementCount > 0) {
                   saveToBaseButton.style.display = 'block'; // Show the button
                   displayBigSmall_sentencesFromBlock(id_block, 0);
                }
                else {
                    saveToBaseButton.style.display = 'none'; // Hide the button if no phrases
                    displayBigSmall_sentencesFromBlock(id_block, 1); 
                }
            } else {
                console.error(`Save button with id button-save-to-db-${id_block} not found.`);
            }
        };

        let sentencesToBlock1 = document.createElement('div');
        sentencesToBlock1.id = `sentences-to-block-${id_block}`;
        sentencesToBlock1.className = 'sentences-to-block';
        sentencesToBlock1.onclick = function(){
          onclick_sentencesToBlock(id_block);
        };

        saveToBaseButton = document.createElement('button');
        saveToBaseButton.textContent = 'Next Frame/Block';
        saveToBaseButton.className = 'button_controlsentences';
        saveToBaseButton.id = `button-save-to-db-${id_block}`;
        saveToBaseButton.style.display = 'none'; // Initially hidden
        saveToBaseButton.onclick = function() {
            let id_block = this.id.replace('button-save-to-db-', '');
            if (!id_block) {
                console.error('ID block not found.');
                return;
            }
            // Call the function to save sentences to the database
            console.log(`Saving sentences for block ID: ${id_block}`);
            // Call the function to save sentences to the database
        //    Save_1Block_ToBase_Sent_TransTo(id_block);
            hideAllBlocksInFrame(id_block);
            // Scroll to the next block if exists
            let nextBlock = document.getElementById(`frame_item-${parseInt(id_block) + 1}`);
            if (nextBlock) {
                nextBlock.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('This is the last block.');
            }
        };

                // textareaB1 Create a textarea for the block
        let textareaB1 = document.createElement('textarea');
        textareaB1.className = 'textareaB1';        
        textareaB1.id = `textareaB1-${id_block}`;
        textareaB1.style.display = 'none';
        textareaB1.rows = 3;
        textareaB1.cols = 50;
        // Add the textarea to the block
        textareaB1.innerHTML = ''; // Clear any previous content

        
         const tittle1 = document.createElement('div');
         tittle1.className = 'headliner_tittle';
         tittle1.id = `headliner_tittle-${id_block}`;
         tittle1.textContent = `Block ${id_block + 1}`;        
         divFrame_item.appendChild(tittle1);


        const div_block_portion_ui_ctrl = document.createElement('div');
        div_block_portion_ui_ctrl.className = 'block_portion_ui_ctrl';
        div_block_portion_ui_ctrl.appendChild(tittle1);
        div_block_portion_ui_ctrl.appendChild(copyButton);
        div_block_portion_ui_ctrl.appendChild(parseButton);
        div_block_portion_ui_ctrl.appendChild(textareaB1);
        
        
        
        divFrame_item.appendChild(sentencesFromBlock);
        divFrame_item.appendChild(div_block_portion_ui_ctrl);
        divFrame_item.appendChild(sentencesToBlock1);
        divFrame_item.appendChild(saveToBaseButton);
    }
    downloadButton = document.createElement("button");
    downloadButton.textContent = "Download JSON Data";
    downloadButton.className = "button_controlsentences";
    downloadButton.onclick = function() {
        SaveAllFramesToDatabase();
    };
    infoDiv.appendChild(downloadButton);

}

function Save_1Block_ToBase_Sent_TransTo(id_block) {
    // Get all sentences in the block
    let sentencesToBlock = document.getElementById(`sentences-to-block-${id_block}`);
    if (!sentencesToBlock) {
        console.error(`Element with id sentences-to-block-${id_block} not found.`);
        return;
    }

    let sentences = sentencesToBlock.querySelectorAll('.sentence-paste-to-item');
    if (sentences.length === 0) {
        alert('No sentences to save.');
        return;
    }

    // Prepare data to save
    let dataToSave = [];
    sentences.forEach(sentence => {
        let idsentence = sentence.getAttribute('idsentence');
        let sentenceText = sentence.innerText.trim();
        if (idsentence && sentenceText) {
            dataToSave.push({
                idsentence: idsentence,
                sentence_to: sentenceText
            });
        }
    });

    // Save to Firebase or any other database
    if (dataToSave.length > 0) {
        // Call your save function here, e.g., SaveSentencesToFirebase(dataToSave);
        SaveTransReadyDataToFireBase(dataToSave);
        alert('Sentences saved successfully!');
    } else {
        alert('No valid sentences to save.');
    }


}


function SaveAllFramesToDatabase(dataToSave) {
    const  infoDiv = document.getElementById('info_div');
    let sentencesToBlocks = infoDiv.querySelectorAll('.sentences-to-block');
    sentencesToBlocks.forEach(block => {
        let sentences = block.querySelectorAll('.sentence-paste-to-item');
        if (sentences.length === 0) {
            console.warn('No sentences to save in this block.');
            return;
        }
        
        // Prepare data to save
       let dataToSave = [];
       sentences.forEach(sentence => {
           let idsentence = sentence.getAttribute('idsentence');
           let sentenceText = sentence.innerText.trim();
           if (idsentence && sentenceText) {
               dataToSave.push({
                   idsentence: idsentence,
                   sentence_to: sentenceText
               });
           }
       });

       // Save to Firebase or any other database
       if (dataToSave.length > 0) {
           // Call your save function here, e.g., SaveSentencesToFirebase(dataToSave);
           SaveTransReadyDataToFireBase(dataToSave);
           alert('Sentences saved successfully!');
       } else {
           alert('No valid sentences to save.');
       }
   });

    const output = window.for_trans_data;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(output, null, 2));

    const downloadLink = document.createElement("a");
    downloadLink.href = dataStr;
    const now = new Date();
    // date time format YYYY_MM_DD_HH_MM_SS
    const filename = now.toISOString().slice(0,19).replace(/-/g,'_').replace(/:/g,'_') + "_trans_tdata.json";
    downloadLink.download = filename;
    downloadLink.textContent = "Download JSON Data";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);


}



function SaveTransReadyDataToFireBase(dataToSave) {
    for (let i = 0; i < dataToSave.length; i++) {
        let sentenceData = dataToSave[i];
        let idsentence = sentenceData.idsentence;
        let sentence_to = sentenceData.sentence_to;
        
        // Find the sentence in the sentences array
        let existingSentence = window.for_trans_data.find(item => item.idsentence == idsentence);
        if (existingSentence) {
            // Update the existing sentence with the new Russian translation
            existingSentence.sentence_to = sentence_to;
            //datetime in format YYYY-MM-DDTHH:mm:ss
            let strdt1 = new Date().toISOString();
            strdt1 = strdt1.replace('T', ' ').substring(0, 19); // Format to YYYY-MM-DD HH:mm:ss
            existingSentence.datetimetrans = strdt1; // Update the translation date

        } 
    }    
//    CopyDataToClipboard();
}

function TextArea_copyToClipboard(TextToCopy1) {

    // Create a temporary textarea element to copy the content
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = TextToCopy1;
    document.body.appendChild(tempTextarea);

    // Select and copy the content
    tempTextarea.select();
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(tempTextarea);
}

function RemoveAllStylesExpImpForTrans() {
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
             style.remove(); 
    });
}




function ExpImpForTrans_createStyles_2() {
   const style = document.createElement('style');
   style.innerHTML = `

       .sentence-item {
           margin-bottom: 8px;
       }
       .sentence-to {
           color: blue;
       }
       .sentence-from {
           color: green;
       }
       .sentence-paste-to-item {           
           padding: 4px;
           border-bottom: 1px solid #ddd;
       }
       .sentence-paste-to-item_dest {           
           padding: 4px;
           border-bottom: 1px solid #ddd;
           background-color: #def4f7f5;
       }
    .item-sentences-to-block{
        border: 1px solid #aaa;
        border-radius: 10px;
        margin-bottom: 8px;
        background-color: #ffffff;
    }


       .button_controlsentences_copy {
           border-radius: 10px;
           background: #2b68a5ff;
           color: white;
       }
       .button_controlsentences{      
           border-radius: 10px;
           background: #2b5d22ff;
           padding: 5px;        
           color: white;
        }
       .headliner_tittle{      
           border-radius: 10px;
           background: #672564ff;
           padding: 5px;        
           color: white;
        }





        .sentences-fromblock{
            border-radius: 15px;
            border: 1px solid #ccc;
            padding: 8px;
            background-color: #b2f75750;
        }

       .block_portion_ui_ctrl{
            border-radius: 15px;
            border: 1px solid #ccc;
            padding: 8px;
            background-color: #f0797933;       
       }

       .sentences-to-block {
           border-radius: 15px;
           border: 1px solid #ccc;
           padding: 8px;
           margin-top: 8px;
           background-color: #f9f9f9;
       }

       .frame_item{           
            border-radius: 30px;
            border: 2px solid #031629ff;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 10px;            
            background-color: #ffffff;
        }

         .containerUI_Block{
            border-radius: 30px;
            border: 2px solid #031629ff;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 10px;            
            background-color: #ffffff;
        }

   `;
   document.head.appendChild(style);
}

