async function translateText(text) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0][0][0]; // This extracts the translated text from the response
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
    document.getElementById("htmlPreview").innerHTML = outputHtml;
}
