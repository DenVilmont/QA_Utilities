import {copyToClipboard} from './utils.js';

let savedValuesArray = JSON.parse(localStorage.getItem('savedValues')) || [];

export function saveValue() {
    const inputValue = document.getElementById('valueInput').value;
    if (inputValue.trim() !== "") {
        if (!savedValuesArray.includes(inputValue)) {
            savedValuesArray.push(inputValue);
            localStorage.setItem('savedValues', JSON.stringify(savedValuesArray));
            addValueToDOM(inputValue);
        } else {
            flashExistingValue(inputValue);
        }
    }
    document.getElementById('valueInput').value = '';
}

export function flashExistingValue(value) {
    const elements = document.querySelectorAll('.saved-value');
    elements.forEach(el => {
        if (el.textContent === value) {
            el.classList.add('flash');
            setTimeout(() => {
                el.classList.remove('flash');
            }, 1000); // Длительность анимации
        }
    });
}

export function handleValueClick(event) {
    const target = event.target;
    if (target.className === 'copy-btn') {
        copyToClipboard(target.parentElement.querySelector('.saved-value').textContent);
    } else if (target.className === 'delete-btn') {
        deleteValue(target.parentElement.querySelector('.saved-value').textContent);
    } else if (target.className === 'saved-value') {
        copyToClipboard(target.textContent);
    }
}

export function deleteValue(value) {
    savedValuesArray = savedValuesArray.filter(item => item !== value);
    localStorage.setItem('savedValues', JSON.stringify(savedValuesArray));
    displaySavedValues(); // Обновить отображение
}

export function addValueToDOM(value) {
    const newValueContainer = document.createElement('div');
    newValueContainer.className = 'saved-value-container';
  
    const newValue = document.createElement('div');
    newValue.className = 'saved-value';
    newValue.textContent = value;
  
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-btn';
    copyButton.setAttribute('data-i18n-title', 'copy');
    copyButton.innerHTML = '&#x1f5d0;';
  
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.setAttribute('data-i18n-title', 'delete');
    deleteButton.innerHTML = '&#x26cc;';
  
    newValueContainer.appendChild(newValue);
    newValueContainer.appendChild(copyButton);
    newValueContainer.appendChild(deleteButton);
  
    document.getElementById('savedValues').appendChild(newValueContainer);
}
  
export function displaySavedValues() {
    const savedValuesContainer = document.getElementById('savedValues');
    savedValuesContainer.innerHTML = ''; // Очистить предыдущий контент
    savedValuesArray.forEach(value => {
        addValueToDOM(value);
    });
}

export function saveNotebookContent() {
    const notebookContent = document.getElementById('notebook').value;
    saveNotebookText(notebookContent);
}

export function saveNotebookText(text) {
    localStorage.setItem('notebookContent', text);
}
  
export function loadNotebookContent() {
    const savedContent = localStorage.getItem('notebookContent');
    if (savedContent) {
        document.getElementById('notebook').value = savedContent;
    }
}







