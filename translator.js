function translateHtml() {
  const inputHtml = document.getElementById("inputHtml").value;
  const parser = new DOMParser();
  const doc = parser.parseFromString(inputHtml, "text/html");

  const translations = {
      "How to Use:": "ارشادات الاستخدام:",
      "No battery needed": "لاتحتاج بطاريات",
      "Caution & Warnings:": "التحذيرات و الاحتياطات:",
      "8 years old and up": "لعمر 8 سنوات فأكبر",
      "Ingredients:": "المكونات :",
      "Plastic": "بلاستيك"
  };

  function translateNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
          const trimmedText = node.textContent.trim();
          if (translations[trimmedText]) {
              node.textContent = translations[trimmedText];
          }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.childNodes.forEach(translateNode);
      }
  }

  doc.body.childNodes.forEach(translateNode);

  const serializer = new XMLSerializer();
  const outputHtml = serializer.serializeToString(doc.body);

  document.getElementById("outputHtml").value = outputHtml;
}
