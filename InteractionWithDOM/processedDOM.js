/**
 * Process text content by trimming, removing multiple spaces and converting to lowercase.
 * @param {string} text - The text content to process.
 * @returns {string} - The processed text content.
 */
function processTextContent(text) {
  // Remove leading and trailing whitespaces
  text = text.trim();

  // Replace multiple spaces with a single space
  text = text.replace(/\s+/g, ' ');

  // Convert to lowercase
  text = text.toLowerCase();

  return text;
}

/**
* Split text content into an array of words.
* @param {string} text - The text content to split.
* @returns {string[]} - An array of words.
*/
function splitTextContentIntoWords(text) {
  // Process the text content
  text = processTextContent(text);

  // Split into words
  const words = text.split(' ');

  return words;
}

/**
* Retrieves all text content of the specified HTML element and its descendants
* that match the provided selector, and returns it as an array of objects
* with unique identifiers for each document and its processed text content.
* The selector defaults to "p", but can be any valid CSS selector.
* 
* @param {string} [selector="p"] - The CSS selector for the elements to retrieve.
* @param {HTMLElement} [root=document] - The root element to search within.
* @returns {Object[]} An array of objects, each containing a unique identifier
* and its processed text content.
*/
function getDOMText(selector = 'p', root = document) {
  const elementsToExtract = ["p", "h1", "h2", "h3", "h4", "h5", "h6"]; // add other element types here if needed
  const extractedText = [];

  elementsToExtract.forEach(elementType => {
      const elements = root.getElementsByTagName(elementType);
      for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          const text = element.textContent;
          const processedText = processTextContent(text);
          const documentId = elementType + '_' + i; // generate unique identifier for each document
          extractedText.push({ id: documentId, text: processedText });
      }
  });

  return extractedText;
}

/**
* Process the text content of the specified HTML element and its descendants
* that match the provided selector, and split it into an array of words.
* The selector defaults to "p", but can be any valid CSS selector.
* 
* @param {string} [selector="p"] - The CSS selector for the elements to process.
* @param {HTMLElement} [root=document] - The root element to search within.
* @returns {Object[]} An array of objects, each containing a unique identifier,
* an array of words representing its processed text content, and the original text content.
*/
function processDOMText(selector = 'p', root = document) {
  const documents = getDOMText(selector, root);
  const processedDocuments = documents.map(doc => ({
      id: doc.id,
      words: splitTextContentIntoWords(doc.text),
      content: doc.text 
  }));
  return processedDocuments;
}

// Example usage
const processedDocuments = processDOMText('p');
console.log(processedDocuments);
