const input = document.getElementById('input');
const output = document.getElementById('output');
const translateButton = document.getElementById('translate');
const copyButton = document.getElementById('copy');

translateButton.addEventListener('click', translateHtml);
copyButton.addEventListener('click', copyToClipboard);

function translateHtml() {
  const html = input.value;
  const text = extractTextFromHtml(html);
  const translatedText = translateToArabic(text);
  output.value = translatedText;
}

function extractTextFromHtml(html) {
  const text = html.replace(/<[^>]*>/g, '');
  return text.trim();
}

function translateToArabic(text) {
  // You'll need to replace this with your own translation API or library
  // For demonstration purposes, I'll use a simple Google Translate API
  const api = 'https://translate.googleapis.com/translate_a/single';
  const params = {
    client: 'gtx',
    sl: 'en',
    tl: 'ar',
    dt: 't',
    q: text
  };
  const url = `${api}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;
  fetch(url)
   .then(response => response.json())
   .then(data => {
      const translatedText = data[0][0][0];
      return translatedText;
    });
}

function copyToClipboard() {
  const text = output.value;
  navigator.clipboard.writeText(text)
   .then(() => {
      console.log('Text copied to clipboard');
    })
   .catch(err => {
      console.error('Error copying text to clipboard:', err);
    });
}