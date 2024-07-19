export function getLanguage() {
    return localStorage.getItem('language') || 'en';
}

function saveLanguage(lang) {
    localStorage.setItem('language', lang);
}

function loadMessages(lang) {
    fetch(`/_locales/${lang}/messages.json`)
        .then(response => response.json())
        .then(data => {
            chrome.i18n.getMessage = key => data[key].message;
            updateLocalizedTexts();
        });
}

export function changeLanguage() {
    const newLang = document.getElementById('languageSelect').value;
    saveLanguage(newLang);
    loadMessages(newLang);
    updateLocalizedTexts();
};

function updateLocalizedTexts() {
    document.querySelectorAll('.i18n').forEach(el => {
        const messageKey = el.getAttribute('data-i18n');
        el.textContent = chrome.i18n.getMessage(messageKey);
    });
  
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const messageKey = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', chrome.i18n.getMessage(messageKey));
    });
  
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const messageKey = el.getAttribute('data-i18n-title');
        el.setAttribute('title', chrome.i18n.getMessage(messageKey));
    });
};