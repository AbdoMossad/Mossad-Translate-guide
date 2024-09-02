function translateHTML() {
    const htmlInput = document.getElementById('htmlInput').value;
    const replaceInput = document.getElementById('replaceInput').value;

    // Extract text content and replace tags
    let translatedHTML = htmlInput;

    // Perform manual replacements
    if (replaceInput) {
        const replacements = replaceInput.split(',');
        replacements.forEach(replacement => {
            const [find, replace] = replacement.split('|');
            const regex = new RegExp(find, 'gi');
            translatedHTML = translatedHTML.replace(regex, replace);
        });
    }

    // Translate text to Arabic using a simple mock function (replace with real translation logic/API)
    translatedHTML = translatedHTML.replace(/(>[^<]+<)/g, match => {
        const text = match.slice(1, -1);
        const translatedText = pseudoTranslateToArabic(text);
        return `>${translatedText}<`;
    });

    // Display the translated HTML
    document.getElementById('output').textContent = translatedHTML;
}

function pseudoTranslateToArabic(text) {
    // Mock translation function - Replace with actual translation logic
    return text.split('').reverse().join(''); // Just a dummy reversal to simulate translation
}

function copyCode() {
    const output = document.getElementById('output');
    navigator.clipboard.writeText(output.textContent)
        .then(() => alert('Code copied to clipboard!'))
        .catch(err => console.error('Failed to copy text: ', err));
}
