import {generateHexSymbol} from './tab1.js';
import {saveNotebookText} from './tab2.js';

export function setVersion() {
    let element = document.getElementById('version');
    let manifestData = chrome.runtime.getManifest();
    element.textContent = 'v.' + manifestData.version;
}

export function copyText(event) {
    const targetId = event.target.getAttribute('data-target');
    let textToCopy;
    if(targetId == 'hexCharText'){
        textToCopy = generateHexSymbol(document.getElementById(targetId).value);
        clearText(event);
    }else{
        textToCopy = document.getElementById(targetId).value;
    }
    copyToClipboard(textToCopy);
};

export function copyToClipboard(textToCopy){
    navigator.clipboard.writeText(textToCopy).catch(function(error) {
        alert('Failed to copy text: ', error);
    });
}

export function clearText(event) {
    const targetId = event.target.getAttribute('data-target').split(' ');
    targetId.forEach(el =>{
        document.getElementById(el).value = '';
        if(targetId == 'notebook'){
            saveNotebookText('');
        }
        if(targetId == 'inputTextLength'){
            document.getElementById('textLengthResult').textContent = '';
        }
    });
};