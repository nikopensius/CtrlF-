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

  const start_time = performance.now();
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
    const wordsJson = data.stemmed_words;
    const backend_execution_time = data.execution_time;

    const end_time = performance.now();
    const total_communication_time = end_time - start_time;

    const communication_time = total_communication_time - backend_execution_time;

    console.log("backend time:", backend_execution_time);
    console.log("communication time:", communication_time);

    return JSON.parse(wordsJson);
  } catch (error) {
    console.error('Error:', error);
    console.log("Stem word array failed, revert to fallback without stemming");
    return words;
  }
}


async function stemParagraphsInBackend(paragraphs) {

  const start_time = performance.now();
  // Define the backend URL for stemming
  const backendURL = 'http://localhost:5000/stemParagraphs';

  // Create the request payload
  const payload = {
    paragraphs: paragraphs
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
    const paragraphsJson = data.stemmed_paragraphs;
    const backend_execution_time = data.execution_time;

    const end_time = performance.now();
    const total_communication_time = end_time - start_time;

    const communication_time = total_communication_time - backend_execution_time;

    console.log("backend time:", backend_execution_time);
    console.log("communication time:", communication_time);

    return JSON.parse(paragraphsJson);
  } catch (error) {
    console.error('Error:', error);
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

function processTextContent(text) {
  text = text.trim();
  text = text.replace(/[^\w\s]/g, ' '); // Remove all non-word and non-space characters
  text = text.replace(/\s+/g, ' ');
  text = text.toLowerCase();
  return text;
}

let invertedIndex = {};

async function buildInvertedIndex(paragraphs) {
  // Process each paragraph
  for (const documentId of Object.keys(paragraphs)) {
    paragraphs[documentId] = processTextContent(paragraphs[documentId]);
  }
  try {
    stemmed_paragraphs = await stemParagraphsInBackend(paragraphs);
  } catch (error) {
    console.log("Error with backend stemming:", error)
  }
  for (const documentId of Object.keys(stemmed_paragraphs)) {
    const stems = stemmed_paragraphs[documentId];
    stems.forEach(stem => {
      if (!invertedIndex[stem]) {
        invertedIndex[stem] = [];
      }
      invertedIndex[stem].push(documentId);
    });
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
    const searchDictionary = {"q0" : searchString}
    let searchDictPromise = stemParagraphsInBackend(searchDictionary);
    console.log(invertedIndex);
    searchDictPromise.then(searchDict => {
      const searchArray = searchDict['q0'];
      const paragraphIds = intersection(searchArray, invertedIndex);
      sendResponse(paragraphIds);
    }).catch(error => {
      console.error("Error processing search array:", error);
      sendResponse([]);
    });
  }
  return true;
});


