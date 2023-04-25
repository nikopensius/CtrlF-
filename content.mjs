(async () => {
  const Nlp = await import('@nlpjs/nlp');
  const nlp = new Nlp();
})();

const STOP_WORDS = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'];

function processTextContent(text, nlp) {
  text = text.trim();
  text = text.replace(/\s+/g, ' ');
  text = text.toLowerCase();
  const words = text.split(' ').filter(word => !STOP_WORDS.includes(word));
  const lemmas = nlp(words.join(' ')).out('array');
  const processedText = lemmas.join(' ');
  return processedText;
}

function splitTextContentIntoWords(text, nlp) {
  text = processTextContent(text, nlp);
  const words = text.split(' ');
  return words;
}

function getDOMText(selector = 'p', root = document, nlp) {
  const elementsToExtract = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
  const extractedText = [];

  elementsToExtract.forEach(elementType => {
    const elements = root.getElementsByTagName(elementType);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const text = element.textContent;
      const processedText = processTextContent(text, nlp);
      const documentId = elementType + '_' + i;
      extractedText.push({ id: documentId, text: processedText });
    }
  });

  const invertedIndex = {};
  extractedText.forEach(doc => {
    const words = splitTextContentIntoWords(doc.text, nlp);
    words.forEach(word => {
      if (!invertedIndex[word]) {
        invertedIndex[word] = new Set();
      }
      invertedIndex[word].add(doc.id);
    });
  });

  console.log('Inverted Index:', invertedIndex);
  return invertedIndex;
}

// Listen for the message from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'performSearch') {
    // Retrieve the DOM text and build the inverted index
    const nlp = window.nlp; // get the NLP library object
    const invertedIndex = getDOMText('p', document, nlp); // pass nlp parameter to the getDOMText function
    console.log("Success")
    console.log('Inverted Index:', invertedIndex);

    // Send the inverted index to the background script
    sendResponse(invertedIndex);
  }
});

