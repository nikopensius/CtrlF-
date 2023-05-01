const performSearch = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const searchInput = 'example keywords'; // Replace with your search keywords
  const keywords = searchInput.split(/,\s*|\s+/);

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => console.log('Injected find bar'),
    allFrames: true,
    matchAboutBlank: true,
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: (keywords) => {
      console.log('Injected keywords:', keywords);
    },
    args: [keywords],
    allFrames: true,
    matchAboutBlank: true,
  });

  await chrome.tabs.sendMessage(tab.id, {
    action: 'injectFindBar',
    keywords,
  });
};

chrome.commands.onCommand.addListener((command) => {
  if (command === 'performSearch') {
    performSearch();
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'invertedIndex') {
    const { payload: invertedIndex } = message;
    console.log('Received inverted index:', invertedIndex);
  } else if (message.action === 'updateKeywordScores') {
    const { payload: query } = message;
    const keywordScores = {};
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
    const { payload: { numParagraphs } } = message;
    const paragraphIds = Object.keys(keywordScores)
      .sort((a, b) => keywordScores[b] - keywordScores[a])
      .slice(0, numParagraphs);
    sendResponse(paragraphIds);
  } else if (message.action === 'searchKeywords') {
    const { keywords } = message;
    console.log('Received search keywords:', keywords);
    sendResponse({ message: 'Received search keywords' });
  }
  return true;
});
