const STOP_WORDS = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'];

function processTextContent(text) {
  text = text.trim();
  text = text.replace(/[^\w\s]/g, ''); // Remove all non-word and non-space characters
  text = text.replace(/\s+/g, ' ');
  text = text.toLowerCase();
  const words = text.split(' ').filter(word => !STOP_WORDS.includes(word));
  return words;
}


function getDOMText(selector = 'p', root = document) {
  const elementsToExtract = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
  const extractedText = {};

  elementsToExtract.forEach(elementType => {
    const elements = root.getElementsByTagName(elementType);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const text = element.textContent;
      const words = processTextContent(text);
      const documentId = elementType + '_' + i;
      words.forEach(word => {
        if (!extractedText[word]) {
          extractedText[word] = new Set();
        }
        extractedText[word].add(documentId);
      });
    }
  });

  // Send the inverted index to the background script
  chrome.runtime.sendMessage({ action: 'invertedIndex', payload: extractedText });

  return extractedText;
}

// Listen for the message from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'performSearch') {
    const invertedIndex = getDOMText('p', document);

    console.log('Inverted Index:', invertedIndex);

    sendResponse(invertedIndex);
  }
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'injectFindBar') {
    // Inject the find bar into the DOM
    const findbar = document.createElement('div');
    findbar.id = 'tfidf-findbar';
    findbar.innerHTML = `
      <input type="text" id="tfidf-findbar-input" placeholder="Search for keywords...">
      <button id="tfidf-findbar-search">Search</button>
    `;
    document.body.appendChild(findbar);

    // Send a response back to the background script
    sendResponse();
  }
});

