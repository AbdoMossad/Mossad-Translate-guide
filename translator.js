async function translateText(text) {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ar`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.responseData.translatedText;
}

async function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
        node.textContent = await translateText(node.textContent.trim());
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

    const serializer = new XMLSerializer();
    const outputHtml = serializer.serializeToString(doc.body);
    document.getElementById("outputHtml").value = outputHtml;
}
