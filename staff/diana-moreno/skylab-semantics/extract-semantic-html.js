// function that extracts the semantic html from an html file.

let noSemanticElements = ['div', 'p', 'a', 'span', 'script', 'strong', 'b', 'noscript', 'br', '#text', '#comment', 'button', 'i'];
let text = '';
const dom = document.getElementsByTagName('body')[0];

function hijos(padre) {
  while (padre.hasChildNodes()) {
    const tagName = padre.firstChild.nodeName.toLowerCase();
    if (!noSemanticElements.includes(tagName)) text += ('<' + tagName + '>');
    if (padre.hasChildNodes()) hijos(padre.firstChild);
    if (!noSemanticElements.includes(tagName)) text += ('</' + tagName + '>');
    padre.removeChild(padre.childNodes[0]);
  }
}

hijos(dom);
console.log(text);