import * as languages from './languages.js';
import * as utils from './utils.js';
import * as tab1 from './tab1.js';
import * as tab2 from './tab2.js';


let checkedTabId = localStorage.getItem('checkedTabId') || 'tab1';

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('languageSelect').value = languages.getLanguage();
  document.querySelectorAll('.copyTextButton').forEach(button => {button.addEventListener('click', utils.copyText);});
  document.querySelectorAll('.clearTextButton').forEach(button => {button.addEventListener('click', utils.clearText);});
  document.getElementById('languageSelect').addEventListener('change', languages.changeLanguage);
  document.querySelectorAll('.tab-header').forEach(span => {span.addEventListener('click', showTab)});
  document.getElementById(checkedTabId).click();
  document.getElementById('generateText').addEventListener('click', tab1.generateText);
  document.getElementById('inputTextLength').addEventListener('input', tab1.countTheLengthOfTheText); 
  document.getElementById('saveValueButton').addEventListener('click', tab2.saveValue);
  document.getElementById('savedValues').addEventListener('click', tab2.handleValueClick);
  document.getElementById('notebook').addEventListener('input', tab2.saveNotebookContent); 
  utils.setVersion();
  tab2.displaySavedValues();
  tab2.loadNotebookContent();
  languages.changeLanguage();
});


function showTab(event) {
  document.querySelectorAll(".tab-content").forEach(element => {
    element.style.display = 'none';
  });
  document.querySelectorAll('.tab-header').forEach(tab =>{
    tab.classList.remove('active');
  });
  event.target.classList.add('active');
  let targetClassId = event.target.getAttribute('id');
  localStorage.setItem('checkedTabId',targetClassId);
  let element = document.querySelector(".tab-content." + targetClassId);
  element.style.display = 'block';
  console.info(element);
};







