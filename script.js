document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            const content = event.target.result;
            translateHTML(content);
        };
        reader.readAsText(file);
    }
});

function translateHTML(html) {
    // This function simulates translation. Replace with actual translation logic.
    const translatedHTML = html.replace(/Hello/g, 'مرحبا'); // Simple translation example
    
    // Save translated HTML to localStorage for preview and copy
    localStorage.setItem('translatedHTML', translatedHTML);
    document.getElementById('translation-link').style.display = 'block';
}

document.getElementById('save-replacements').addEventListener('click', function() {
    // Handle manual replacement logic
    // For simplicity, just logging the text area content
    const manualReplacements = document.getElementById('manual-replacements').value;
    console.log('Manual Replacements:', manualReplacements);
});

document.getElementById('copy-code').addEventListener('click', function() {
    const code = localStorage.getItem('translatedHTML');
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    });
});

window.addEventListener('load', function() {
    if (document.getElementById('preview-frame')) {
        const code = localStorage.getItem('translatedHTML');
        document.getElementById('preview-frame').srcdoc = code;
    }
});
