/**
 * Retrieves all text content of the specified HTML element and its descendants
 * that match the provided selector, and returns it as a single string.
 * The selector defaults to "p", but can be any valid CSS selector.
 * 
 * @param {string} [selector="p"] - The CSS selector for the elements to retrieve.
 * @param {HTMLElement} [root=document] - The root element to search within.
 * @returns {string} The concatenated text content of all matching elements.
 */


function extractTextFromDOM() {
    const elementsToExtract = ["p", "h1", "h2", "h3", "h4", "h5", "h6"]; // add other element types here if needed
    const extractedText = [];
  
    elementsToExtract.forEach(elementType => {
      const elements = document.getElementsByTagName(elementType);
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        extractedText.push(element.textContent);
      }
    });
  
    return extractedText.join("\n");
  }

  