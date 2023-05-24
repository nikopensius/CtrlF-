const STOP_WORDS = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'];

function processTextContent(text) {
  text = text.trim();
  // Idea for quick bug fix "rabbits7": '' -> ' '
  text = text.replace(/[^\w\s]/g, ' '); // Remove all non-word and non-space characters
  text = text.replace(/\s+/g, ' ');
  text = text.toLowerCase();
  /*
  TODO: Return an array of sentences? instead of array of words
        It will be used by backend to tokenize sentence into tokens and then lemmatize.
  Return should be *sentences* not *words*
  */
  const words = text.split(' ').filter(word => !STOP_WORDS.includes(word));
  return words;
}


function getDOMText(selector = 'p', root = document) {
  const elementsToExtract = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
  const invertedIndex = {};
  const paragraphs = {};
  const html = document.querySelector('body').innerHTML;

  /*
  TODO :  Check backend connexion here.
          Create flag for future
  */

  elementsToExtract.forEach(elementType => {
    const regex = new RegExp(`<${elementType}[^>]*>(.*?)<\/${elementType}>`, 'gs');
    let match;
    while ((match = regex.exec(html)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, '');
      const documentId = elementType + '_' + Object.keys(paragraphs).length;
      paragraphs[documentId] = match[1]

      /*
          /`` This is future for flag /´´
      TODO: Add check connexion to backend?
            If (connexion) -> processTextContent into SENTENCES
                              Send SENTENCES to backend for **Paragraph lemmatization**
            If NOT (connexion) -> continue as usual, make the inverted index here 
      */
      const words = processTextContent(text);
      words.forEach(word => {
        if (!invertedIndex[word]) {
          invertedIndex[word] = [];
        }
        invertedIndex[word].push(documentId);
      });
    }
  });

  // Send the inverted index to the background script
  // This might NOT be the best place for send InvIndx to background,
  chrome.runtime.sendMessage({ action: 'invertedIndex', payload: invertedIndex });

  return { invertedIndex, paragraphs };
}





let paragraphs_and_ids = []

// Listen for the message from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'performSearch') {
    const results = getDOMText('p', document);

    // make up your mind . textData / invertedIndex????
    const textData = results.textData;
    paragraphs_and_ids = results.paragraphs;

    sendResponse(textData);
  }
});

function filterParagraphs(paragraphs, idsToHighlight) {
  const textToHighlight = [];

  for (const paragraphId of idsToHighlight) {
    const text = paragraphs[paragraphId];
    if (text) {
      textToHighlight.push(text);
    }
  }
  return textToHighlight;
}



//remove any previous highlighting using span element unwrapping
function removePreviousHighlighting() {
  const highlightedSpans = document.querySelectorAll('.highlight');
  highlightedSpans.forEach(span => {
    const parent = span.parentNode;
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
  });
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
  
  // remove any previous highlighting
  removePreviousHighlighting();

  const body = document.querySelector('body');
  let html = body.innerHTML;


  paragraphsToHighlight.forEach(paragraph => {
    const regex = new RegExp(escapeRegExp(paragraph), 'gi');
    html = html.replace(regex, `<span class="highlight">${paragraph}</span>`);
  });
  body.innerHTML = html;
}

// Function to escape special characters in a string for use in a regular expression
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



// Define the function that handles the click event outside of the injectFindBar listener
function handleFindButtonClick() {
  const findInput = document.getElementById('tfidf-findbar-input');
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

// Listen for keypress events on the document and delegate to the find input
document.addEventListener('keypress', function(event) {
  if (event.target && event.target.id === 'tfidf-findbar-input' && event.key === 'Enter') {
    handleFindButtonClick();
  }
});

// Listen for click events on the document and delegate to the findbar close button
document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'tfidf-findbar-close') {
    // Remove the findbar from the DOM
    const findbar = document.getElementById('tfidf-findbar');
    if (findbar) {
      removePreviousHighlighting();
      findbar.remove();
    }
  }
});

// Event listener for "Esc" key press
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const findbar = document.getElementById('tfidf-findbar');
    if (findbar && findbar.style.display !== 'none') {
      removePreviousHighlighting();
      findbar.remove();
    }
  }
});

// Listen for keypress events on the document and delegate to the find input
document.addEventListener('keypress', function(event) {
  if (event.target && event.target.id === 'tfidf-findbar-input' && event.key === 'Enter') {
    handleFindButtonClick();
  }
});


// Function to inject the find bar into the DOM
function injectFindBar() {
  // Check if the find bar already exists
  if (document.getElementById('tfidf-findbar')) {
    return;
  }
  
  // Inject the find bar into the DOM
  const findbar = document.createElement('div');
  findbar.id = 'tfidf-findbar';
  findbar.innerHTML = `
  <div style="position: fixed; top: 0; right: 0; width: 300px; padding: 10px; background-color: #fff; border-radius: 10px; border: 1px solid #ccc; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); z-index: 9999;">
    <input type="text" id="tfidf-findbar-input" placeholder="Insert keywords and hit Enter" autofocus style="border: none; outline: none; width: 60%" autocomplete="off">
    <button id="tfidf-findbar-close" style="position: absolute; top: 10px; right: 15px; font-weight: bold; border: none; background-color: #fff; cursor: pointer;">X</button>
  </div>
  `
  /*

  */
  ;  
  document.body.appendChild(findbar);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'injectFindBar') {
    injectFindBar();
    // Focus the input field
    document.getElementById('tfidf-findbar-input').focus();
    sendResponse();
  }
});
