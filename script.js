document.getElementById('translate-button').addEventListener('click', function(event) {
    const htmlInput = document.getElementById('html-input').value;
    if (htmlInput.trim()) {
        translateHTML(htmlInput);
    }
});

function translateHTML(html) {
    // Simulate translation (Replace this with actual translation logic)
    const translatedHTML = html.replace(/Hello/g, 'مرحبا'); // Example translation

    // Save translated HTML to localStorage for use in other pages
    localStorage.setItem('translatedHTML', translatedHTML);
    document.getElementById('translation-link').style.display = 'block';
}

document.getElementById('save-replacements')?.addEventListener('click', function() {
    // Handle manual replacement logic
    const manualReplacements = document.getElementById('manual-replacements').value;
    console.log('Manual Replacements:', manualReplacements);
    // Here you can implement the logic to apply manual replacements
});

document.getElementById('copy-code')?.addEventListener('click', function() {
    const code = localStorage.getItem('translatedHTML');
    if (code) {
        navigator.clipboard.writeText(code).then(() => {
            alert('Code copied to clipboard!');
        });
    }
});

window.addEventListener('load', function() {
    if (document.getElementById('translated-code')) {
        const code = localStorage.getItem('translatedHTML');
        document.getElementById('translated-code').value = code;
    }
    if (document.getElementById('preview-frame')) {
        const code = localStorage.getItem('translatedHTML');
        document.getElementById('preview-frame').srcdoc = code;
    }
});
