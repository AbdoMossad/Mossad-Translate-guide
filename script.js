const input = document.getElementById('input');
const output = document.getElementById('output');
const translateButton = document.getElementById('translate');
const copyButton = document.getElementById('copy');

translateButton.addEventListener('click', translateHtml);
copyButton.addEventListener('click', copyToClipboard);

function translateHtml() {
  const html = input.value;
  const translatedHtml = translateToArabic(html);
  output.value = translatedHtml;
}

function translateToArabic(html) {
    const api = 'https://translate.googleapis.com/translate_a/single';
    const params = {
      client: 'gtx',
      sl: 'en',
      tl: 'ar',
      dt: 't',
      q: html
    };
    const url = `${api}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;
  
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        const translatedText = data[0][0][0];
        const translatedHtml = html.replace(/<[^>]*>([^<]+)<\/[^>]*>/g, (match, group) => {
          return match.replace(group, translateText(group));
        });
        return translatedHtml;
      });
  }
  
  function translateText(text) {
    const api = 'https://translate.googleapis.com/translate_a/single';
    const params = {
      client: 'gtx',
      sl: 'en',
      tl: 'ar',
      dt: 't',
      q: text
    };
    const url = `${api}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;
    return fetch(url)
    .then(response => response.json())
    .then(data => data[0][0][0]);
  }

function translateText(text) {
  const api = 'https://translate.googleapis.com/translate_a/single';
  const params = {
    client: 'gtx',
    sl: 'en',
    tl: 'ar',
    dt: 't',
    q: text
  };
  const url = `${api}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;
  return fetch(url)
   .then(response => response.json())
   .then(data => data[0][0][0]);
}

function copyToClipboard() {
  const text = output.value;
  navigator.clipboard.writeText(text);
}