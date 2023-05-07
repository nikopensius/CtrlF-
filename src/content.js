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
  const paragraphs = [];
  const html = document.querySelector('body').innerHTML;

  elementsToExtract.forEach(elementType => {
    const regex = new RegExp(`<${elementType}[^>]*>(.*?)<\/${elementType}>`, 'gs');
    let match;
    while ((match = regex.exec(html)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, '');
      const words = processTextContent(text);
      const documentId = elementType + '_' + paragraphs.length;
      const paragraphText = {
        id: documentId,
        text: match[1]
      }
      paragraphs.push(paragraphText);
      words.forEach(word => {
        if (!extractedText[word]) {
          extractedText[word] = [];
        }
        extractedText[word].push(documentId);
      });
    }
  });

  // Send the inverted index to the background script
  chrome.runtime.sendMessage({ action: 'invertedIndex', payload: extractedText });

  return { extractedText, paragraphs };
}





let paragraphs_and_ids = []

// Listen for the message from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'performSearch') {
    const results = getDOMText('p', document);

    const invertedIndex = results.extractedText;
    paragraphs_and_ids = results.paragraphs;

    console.log('Inverted Index:', invertedIndex);
    console.log('Paragraphs:', paragraphs_and_ids);

    sendResponse(invertedIndex);
  }
});

// Define the function that handles the click event outside of the injectFindBar listener
function handleFindButtonClick(findInput) {
  const searchString = findInput.value.trim();
  console.log('User entered search string:', searchString);
  // Remove non-word characters, split input into array of words
  const searchArray = processTextContent(searchString)
  console.log('User input processed to array:', searchArray);
  // Send message to background script with user query
  chrome.runtime.sendMessage({ action: 'userQuery', payload: searchArray}, function (response) {
    console.log(response);
    const paragraphsToHighlight = filterParagraphs(paragraphs_and_ids, response)
    highlightText(paragraphsToHighlight)
  });

}

function filterParagraphs(paragraphs, idsToHighlight) {
  const textToHighlight = [];

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    if (idsToHighlight.includes(paragraph.id)) {
      textToHighlight.push(paragraph.text);
    }
  }
  return textToHighlight;
}


function highlightText(paragraphsToHighlight) {
  // Create a <style> element
  var styleElement = document.createElement('style');

  // Set the CSS rule
  var cssRule = '.highlight { background-color: yellow; }';

  // Add the CSS rule to the <style> element
  styleElement.appendChild(document.createTextNode(cssRule));

  // Append the <style> element to the <head> section
  document.head.appendChild(styleElement);

  const body = document.querySelector('body');
  let html = body.innerHTML;
  paragraphsToHighlight.forEach(paragraph => {
    const regex = new RegExp(escapeRegExp(paragraph), 'gi');
    html = html.replace(regex, `<span class="highlight">${paragraph}</span>`);
  });
  body.innerHTML = html;
  console.log("Changed HTML:", html);
}

// Function to escape special characters in a string for use in a regular expression
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}





// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'injectFindBar') {
    // Check if the find bar already exists
    if (document.getElementById('tfidf-findbar')) {
      return sendResponse();
    }
    // Inject the find bar into the DOM
    const findbar = document.createElement('div');
    findbar.id = 'tfidf-findbar';
    findbar.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; background-color: #f5f5f5; padding: 10px;">
      <input type="text" id="tfidf-findbar-input" placeholder="Search for keywords...">
      <button id="tfidf-findbar-search">Find</button>
    </div>
  `;  
    document.body.appendChild(findbar);

    // Get the find button and text input elements
    const findButton = document.getElementById('tfidf-findbar-search');
    const findInput = document.getElementById('tfidf-findbar-input');

    // Add event listener to the find button (if the user clicks on find)
    findButton.addEventListener('click', function() {
      handleFindButtonClick(findInput);
    });
    // Add event listener to the find input (if the user presses Enter)
    findInput.addEventListener('keypress', function(e) {
      if (e.key === "Enter") {
        handleFindButtonClick(findInput);
      }
    });
    

    // Send a response back to the background script
    sendResponse();
  }
});