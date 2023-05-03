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

// Listen for the keyboard shortcut
chrome.commands.onCommand.addListener(command => {
  if (command === 'performSearch') {
    // Send a message to the content script to inject the find bar
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'performSearch' }
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
  if (message.action === 'invertedIndex') {
    // Store the inverted index
    invertedIndex = message.payload;
    console.log('Received inverted index:', invertedIndex);
  } else if (message.action === 'updateKeywordScores') {
    // Update the keyword scores with the new search query
    const query = message.payload;
    keywordScores = {};
    for (const keyword of query.split(' ')) {
      if (!invertedIndex.hasOwnProperty(keyword)) {
        continue;
      }
      const documents = Object.keys(invertedIndex[keyword]);
      const idf = Math.log(Object.keys(invertedIndex).length / documents.length);
      for (const document of documents) {
        if (!keywordScores.hasOwnProperty(document)) {
          keywordScores[document] = 0;
        }
        const tf = invertedIndex[keyword][document];
        keywordScores[document] += tf * idf;
      }
    }
    console.log('Updated keyword scores:', keywordScores);
    sendResponse();
  } else if (message.action === 'getHighestScoringParagraphs') {
    // Get the top N paragraphs with the highest TF-IDF scores
    const numParagraphs = message.payload.numParagraphs;
    const paragraphIds = Object.keys(keywordScores).sort((a, b) => keywordScores[b] - keywordScores[a]).slice(0, numParagraphs);
    sendResponse(paragraphIds);
  } else if (message.action === 'userQuery') {
    // find paragraphs that contain user query keywords
    const searchArray = message.payload
    console.log("Received query words:", searchArray)
    var paragraph_ids = intersection(searchArray, invertedIndex);
    sendResponse(paragraph_ids);
  }
  return true;
});