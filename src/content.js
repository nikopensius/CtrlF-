const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in',
  'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the',
  'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'
]);

function processTextContent(text) {
  text = text.trim();
  text = text.replace(/[^\w\s]/g, ''); // Remove all non-word and non-space characters
  text = text.replace(/\s+/g, ' ');
  text = text.toLowerCase();
  const words = text.split(' ').filter(word => !STOP_WORDS.has(word));
  return words;
}

function getDOMText(root = document, selector = 'p, h1, h2, h3, h4, h5, h6') {
  const elements = root.querySelectorAll(selector);
  const extractedText = {};

  elements.forEach((element, i) => {
    const text = element.textContent;
    const words = processTextContent(text);
    const documentId = `${element.nodeName}_${i}`;
    words.forEach(word => {
      if (!extractedText[word]) {
        extractedText[word] = new Set();
      }
      extractedText[word].add(documentId);
    });
  });

  // Send the inverted index to the background script
  chrome.runtime.sendMessage({ action: 'invertedIndex', payload: extractedText });

  return extractedText;
}

// Listen for the message from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'performSearch') {
    const invertedIndex = getDOMText(document, 'p, h1, h2, h3, h4, h5, h6');

    console.log('Inverted Index:', invertedIndex);

    sendResponse(invertedIndex);
  } else if (message.action === 'injectFindBar') {
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
  } else if (message.action === 'searchResults') {
    // Do something with the search results
    console.log('Search Results:', message.payload);
  }
});

// Listen for clicks on the search button in the find bar
document.addEventListener('click', (event) => {
  if (event.target.id === 'tfidf-findbar-search') {
    // Get the search input value
    const searchInput = document.getElementById('tfidf-findbar-input').value.trim();

    // Parse the search keywords
    const keywords = searchInput.split(/,\s*|\s+/);

    // Check if there are keywords to search for
    if (keywords.length > 0) {
      // Send the keywords to the background script
      chrome.runtime.sendMessage({
        action: 'searchKeywords',
        payload: keywords
      }, (response) => {
        console.log(response.message);
      });
    }
  }
});
