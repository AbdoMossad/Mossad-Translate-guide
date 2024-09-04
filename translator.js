async function translateText(text) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0][0][0]; // Extract the translated text from the response
}

function applyManualTranslations(text) {
    const entries = JSON.parse(localStorage.getItem('translationEntries')) || [];
    entries.forEach(entry => {
        const regex = new RegExp(entry.find, 'gi'); // Case-insensitive replacement
        text = text.replace(regex, entry.replace);
    });
    return text;
}

async function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
        // Get automated translation
        let translatedText = await translateText(node.textContent.trim());
        node.textContent = translatedText;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const child of node.childNodes) {
            await translateNode(child);
        }
    }
}

async function translateHtml() {
    const inputHtml = document.getElementById("inputHtml").value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(inputHtml, "text/html");

    await translateNode(doc.body);

    // Replace <body> with <div> and set text alignment and direction
    let translatedContent = doc.body.innerHTML; // Get the inner content of the body
    translatedContent = `<div style="text-align: right; direction: rtl;">${translatedContent}</div>`;

    // Apply manual translations to the translated HTML
    translatedContent = applyManualTranslations(translatedContent);

    // Display the translated HTML code in the textarea
    document.getElementById("outputHtml").value = translatedContent;

    // Render the translated HTML in the HTML preview div
    document.getElementById("htmlPreview").innerHTML = translatedContent;
}

function toggleView() {
    const previewDiv = document.getElementById("htmlPreview");
    const viewButton = document.getElementById("viewButton");
    if (previewDiv.style.display === "none") {
        previewDiv.style.display = "block";
        viewButton.textContent = "Hide View";
    } else {
        previewDiv.style.display = "none";
        viewButton.textContent = "Show View";
    }
}

function copyToClipboard() {
    const outputHtml = document.getElementById("outputHtml");
    outputHtml.select();
    outputHtml.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Translated HTML code copied to clipboard!");
}

function redirectToManual() {
    window.location.href = 'manual-translations.html';
}

function loadTranslationEntries() {
    const entries = JSON.parse(localStorage.getItem('translationEntries')) || [];
    const tableBody = document.querySelector('#translationTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    entries.forEach(entry => {
        const row = document.createElement('tr');
        const findCell = document.createElement('td');
        const replaceCell = document.createElement('td');
        findCell.textContent = entry.find;
        replaceCell.textContent = entry.replace;
        row.appendChild(findCell);
        row.appendChild(replaceCell);
        tableBody.appendChild(row);
    });
}
window.onload = loadTranslationEntries;