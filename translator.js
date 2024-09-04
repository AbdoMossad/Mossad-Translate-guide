async function translateText(text) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0][0][0]; // Extract the translated text from the response
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
