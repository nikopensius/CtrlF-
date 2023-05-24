// portion of code to test communications with Python backend

// Send a request to the server
function sendRequestToServer(data) {
  fetch('http://localhost:5000/process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      // Handle the response from the server
      console.log(result);
      // Perform further actions with the result
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors
    });
}

// Example usage
const data = {
  content: "The quick brown foxes jumped over the lazy dogs."
};


//sendRequestToServer(data);


// function to send array of words to backend for lemmatization
async function sendWordsToBackend(words) {
  // Define the backend URL for lemmatization
  const backendURL = 'http://localhost:5000/lemmatize';

  // Create the request payload
  const payload = {
    words: words
  };

  // Send the request to the backend and return the lemmatized words
  try {
    const response = await fetch(backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data.lemmatizedWords;
  } catch (error) {
    console.error('Error:', error);
    console.log("Lemmatize word array failed, revert to fallback without lemmatization");
    return words;
  }
}









// function to find paragraphs that contain all keywords
function intersection (keywords, invertedIndex) {
  var result = new Set (); // or a hash map
  var first = true; // flag to indicate the first keyword
  for (var keyword of keywords) {
    var paragraph_ids = invertedIndex [keyword]; // get the list of paragraph_ids
    if (paragraph_ids) {
      if (first) { // if this is the first keyword, add all the paragraphs to the result
          for (var paragraph_id of paragraph_ids) {
          result.add (paragraph_id); // add the paragraph_id to the result
        }
        first = false; // set the flag to false
      } else { // if this is not the first keyword, intersect with the previous result
        var temp = new Set (); // create a temporary set
        for (var paragraph_id of paragraph_ids) {
          if (result.has (paragraph_id)) { // if the paragraph_id is already in the result
            temp.add (paragraph_id); // add it to the temporary set
          }
        }
        result = temp; // update the result with the temporary set
      }
    } else { // if there is no paragraph for this keyword, return an empty result
      return [];
    }
  }
  return Array.from (result); // convert the set to an array and return it
}



////////////////////////////////////////////////////////////////////////////////////
// Text Processing and Inverted Index logic

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

// Define a variable to store the inverted index
let invertedIndex = {};

// Function to build the inverted index
function buildInvertedIndex(paragraphs) {
  // Clear the existing inverted index

  // Process each paragraph
  Object.keys(paragraphs).forEach(documentId => {
    const text = paragraphs[documentId];
    let words = processTextContent(text);
/*
    // attempt word lemmatization using Python backend
    words = sendWordsToBackend(words);
*/
    // Update the inverted index
    words.forEach(word => {
      if (!invertedIndex[word]) {
        invertedIndex[word] = [];
      }
      invertedIndex[word].push(documentId);
    });
  });
}

// Listen for the keyboard shortcut
chrome.commands.onCommand.addListener(command => {
  if (command === 'performSearch') {
    // Send a message to the content script to get the documents
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'getDocuments' },
        response => {
          // Handle the response from the content script
          const paragraphs = response;
          console.log("performSearch paragraphs:", paragraphs);
          buildInvertedIndex(paragraphs);
        }
      );

      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: 'console.log("Injected find bar");',
          allFrames: true,
          matchAboutBlank: true
        },
        () => {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: 'injectFindBar' }
          );
        }
      );
    });
  }
});


// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'userQuery') {
    const searchArray = message.payload;
    console.log(invertedIndex);
    const paragraphIds = intersection(searchArray, invertedIndex);
    sendResponse(paragraphIds);
  }
  return true;
});


