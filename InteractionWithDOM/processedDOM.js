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
   * that match the provided selector, and returns it as an array of strings, where each string
   * represents the text content of a single matching element.
   * The selector defaults to "p", but can be any valid CSS selector.
   * 
   * @param {string} [selector="p"] - The CSS selector for the elements to retrieve.
   * @param {HTMLElement} [root=document] - The root element to search within.
   * @returns {string[]} An array of strings, where each string represents the text content of a matching element.
   */
  function getDOMText(selector = 'p', root = document) {
    const elementsToExtract = ["p", "h1", "h2", "h3", "h4", "h5", "h6"]; // add other element types here if needed
    const extractedText = [];
  
    elementsToExtract.forEach(elementType => {
      const elements = root.getElementsByTagName(elementType);
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.matches(selector)) {
          extractedText.push(element.textContent);
        }
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
   * @returns {string[][]} An array of arrays of strings, where each inner array represents the words of a single matching element.
   */
  function processDOMText(selector = 'p', root = document) {
    const textArray = getDOMText(selector, root);
    const wordsArray = textArray.map(text => splitTextContentIntoWords(text));
    return wordsArray;
  }
  
  const words = processDOMText('p');
  console.log(words);
  