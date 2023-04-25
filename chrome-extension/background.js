// Listen for the keyboard shortcut
chrome.commands.onCommand.addListener(command => {
    if (command === 'performSearch') {
      // Send a message to the content script to perform the search
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'performSearch' });
      });
    }
  });
  