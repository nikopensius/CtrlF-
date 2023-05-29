
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
  const inv_index_paragraphs = {};
  const highlight_paragraphs = {};
  const html = document.querySelector('body').innerHTML;

  elementsToExtract.forEach(elementType => {
    const regex = new RegExp(`<${elementType}[^>]*>(.*?)<\/${elementType}>`, 'gs');
    let match;
    while ((match = regex.exec(html)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, '');
      const documentId = elementType + '_' + Object.keys(highlight_paragraphs).length;
      highlight_paragraphs[documentId] = match[1];
      inv_index_paragraphs[documentId] = text;
    }
  });
  return {
    highlightParagraphs: highlight_paragraphs,
    invIndexParagraphs: inv_index_paragraphs
  };
}


let paragraphs_and_ids = []

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getDocuments') {
    const { highlightParagraphs, invIndexParagraphs } = getDOMText();
    console.log("Inv index paragraphs:", invIndexParagraphs);
    paragraphs_and_ids = highlightParagraphs;
    sendResponse(invIndexParagraphs);
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


let paragraphIds = []; // Array to store the paragraphIds
let currentIndex = -1; // Current index of the highlighted paragraph

function highlightText(paragraphsToHighlight) {

  // Reset the paragraphIds and currentIndex
  paragraphIds = [];
  currentIndex = -1;

  // Create a <style> element
  var styleElement = document.createElement('style');

  // Set the CSS rule
  var cssRule = '.highlight { background-color: yellow; }';

  // Add the CSS rule to the <style> element
  styleElement.appendChild(document.createTextNode(cssRule));

  // Append the <style> element to the <head> section
  document.head.appendChild(styleElement);

  removePreviousHighlighting();

  const body = document.querySelector('body');
  let html = body.innerHTML;


  paragraphsToHighlight.forEach((paragraph, index) => {
    const paragraphId = `highlighted-section-${index + 1}`;
    const regex = new RegExp(escapeRegExp(paragraph), 'gi');
    html = html.replace(regex, `<span id="${paragraphId}" class="highlight">${paragraph}</span>`);
    paragraphIds.push(paragraphId);
  });
  body.innerHTML = html;
}

// Function to escape special characters in a string for use in a regular expression
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



// Define the function that handles the Enter keypress event
function handleFindInputEnter(event) {
  if (event.target && event.target.id === 'tfidf-findbar-input' && event.key === 'Enter') {
    const findInput = document.getElementById('tfidf-findbar-input');
    const searchString = findInput.value.trim();
    // Send message to background script with user query
    chrome.runtime.sendMessage({ action: 'userQuery', payload: searchString }, function(response) {
      console.log(response);
      const paragraphsToHighlight = filterParagraphs(paragraphs_and_ids, response);
      highlightText(paragraphsToHighlight);
      if (paragraphsToHighlight.length > 0) {
        navigateToNext();
      }
      updatePositionCount();
      
    });
  }
}

// Listen for keypress events on the document and delegate to the find input
document.addEventListener('keypress', handleFindInputEnter);


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

document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'tfidf-findbar-previous') {
    navigateToPrevious();
  }
});

document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'tfidf-findbar-next') {
    navigateToNext();
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

function scrollToParagraph(paragraphId) {
  const paragraphElement = document.getElementById(paragraphId);
  if (paragraphElement) {
    paragraphElement.scrollIntoView({ behavior: 'smooth' });
  }
}

function navigateToPrevious() {
  if (currentIndex > 0) {
    currentIndex--;
    scrollToParagraph(paragraphIds[currentIndex]);
    updatePositionCount();
  }
}

function navigateToNext() {
  if (currentIndex < paragraphIds.length - 1) {
    currentIndex++;
    scrollToParagraph(paragraphIds[currentIndex]);
    updatePositionCount();
  }
}

function updatePositionCount() {
  const positionCountElement = document.getElementById('tfidf-findbar-position');
  positionCountElement.textContent = `${currentIndex + 1}/${paragraphIds.length}`;
}



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
  <div id="tfidf-findbar" style="position: fixed; top: 0; right: 0; width: 300px; padding: 10px; background-color: #fff; border-radius: 10px; border: 1px solid #ccc; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); z-index: 9999; display: flex; align-items: center;">
  <input type="text" id="tfidf-findbar-input" placeholder="Insert keywords and hit Enter" autofocus style="border: none; outline: none; flex: 1; margin-right: 5px;" autocomplete="off">
  <div style="display: flex; align-items: center; margin-right: 5px;">
    <div id="tfidf-findbar-position" style="font-size: 14px; margin-right: 5px;"></div>
    <button id="tfidf-findbar-previous" style="border: none; background-color: #fff; cursor: pointer;">&#9650;</button>
    <button id="tfidf-findbar-next" style="border: none; background-color: #fff; cursor: pointer;">&#9660;</button>
  </div>
  <button id="tfidf-findbar-close" style="font-weight: bold; border: none; background-color: #fff; cursor: pointer;">X</button>
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
