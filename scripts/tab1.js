export function generateText() {
    const textLength = parseInt(document.getElementById('textLength').value);
    if (isNaN(textLength) || textLength <= 0) {
        alert(chrome.i18n.getMessage("EnterValidPositiveNumber"));
        return;
    }
    const generatedText = generateRandomText(textLength);
    document.getElementById('generatedText').value = generatedText;
};

export function generateRandomText(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export function generateHexSymbol(charCode) {
    const symbol = String.fromCharCode(charCode);  
    const hexValue = symbol.toString(16).toUpperCase();
    return hexValue;
};

export function countTheLengthOfTheText(){
    const textLength = document.getElementById('inputTextLength').value.length;
    if (textLength > 0) {
        document.getElementById('textLengthResult').textContent = ' (' + textLength + ')';
    } else {
        document.getElementById('textLengthResult').textContent = '';
    }
}