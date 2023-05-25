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


// function to send array of words to backend for stemming
async function sendWordsToBackend(words) {
  // Define the backend URL for stemming
  const backendURL = 'http://localhost:5000/stem';

  // Create the request payload
  const payload = {
    words: words
  };

  // Send the request to the backend and return the stemmed words
  try {
    const response = await fetch(backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    const wordsJson = data.stemmedWords;
    return JSON.parse(wordsJson);
  } catch (error) {
    console.error('Error:', error);
    console.log("Stem word array failed, revert to fallback without stemming");
    return words;
  }
}









// function to find paragraphs that contain all keywords
function intersection (keywords, invertedIndex) {
  var result = new Set (); // or a hash map
  var first = true; // flag to indicate the first keyword
  console.log("Intersection function");
  console.log("Keywords:", keywords);
  console.log("invertedIndex:", invertedIndex);
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

async function processTextContent(text) {
  text = text.trim();
  text = text.replace(/[^\w\s]/g, ' '); // Remove all non-word and non-space characters
  text = text.replace(/\s+/g, ' ');
  text = text.toLowerCase();
  let words;
  try {
    words = await sendWordsToBackend(text);
  } catch (error) {
    // Fallback: if backend connection fails, split words locally
    console.log("Backend failure, reverting to fallback.")
    words = text.split(' ').filter(word => !STOP_WORDS.includes(word));
  }
  return words;
}

// Define a variable to store the inverted index
let invertedIndex = {};

// Function to build the inverted index
async function buildInvertedIndex(paragraphs) {
  // Clear the existing inverted index

  // Process each paragraph
  for (const documentId of Object.keys(paragraphs)) {
    const text = paragraphs[documentId];
    try {
      const words = await processTextContent(text);
      words.forEach(word => {
        if (!invertedIndex[word]) {
          invertedIndex[word] = [];
        }
        invertedIndex[word].push(documentId);
      });
    } catch (error) {
      console.log("Error with processed words:", error);
    }
  }
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
    const searchString = message.payload;
    // Remove non-word characters, split input into array of words
    let searchArrayPromise = processTextContent(searchString);
    searchArrayPromise.then(searchArray => {
      const paragraphIds = intersection(searchArray, invertedIndex);
      console.log("Inverted Index", invertedIndex)
      console.log("Search array", searchArray)
      sendResponse(paragraphIds);
    }).catch(error => {
      console.error("Error processing search array:", error);
      sendResponse([]);
    });
  }
  return true;
});


