/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content.js":
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
/***/ (() => {

eval("// Create a script element\nvar script = document.createElement('script');\n// Set the src attribute to the location of the lemmatizer.js file\nscript.src = '';\n// Define a callback function to execute after the script is loaded\nscript.onload = function () {\n  // The lemmatizer module is now available\n  // You can use its functionality here\n  var lemmatizer = new Lemmatizer();\n  // ...\n};\n// Append the script element to the head or body of the web page\ndocument.head.appendChild(script);\nvar STOP_WORDS = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'];\nfunction processTextContent(text) {\n  text = text.trim();\n  text = text.replace(/[^\\w\\s]/g, ''); // Remove all non-word and non-space characters\n  text = text.replace(/\\s+/g, ' ');\n  text = text.toLowerCase();\n  var words = text.split(' ').filter(function (word) {\n    return !STOP_WORDS.includes(word);\n  });\n  return words;\n}\nfunction getDOMText() {\n  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'p';\n  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;\n  var elementsToExtract = [\"p\", \"h1\", \"h2\", \"h3\", \"h4\", \"h5\", \"h6\"];\n  var extractedText = {};\n  var paragraphs = [];\n  var html = document.querySelector('body').innerHTML;\n  elementsToExtract.forEach(function (elementType) {\n    var regex = new RegExp(\"<\".concat(elementType, \"[^>]*>(.*?)</\").concat(elementType, \">\"), 'gs');\n    var match;\n    var _loop = function _loop() {\n      var text = match[1].replace(/<[^>]+>/g, '');\n      var words = processTextContent(text);\n      var documentId = elementType + '_' + paragraphs.length;\n      var paragraphText = {\n        id: documentId,\n        text: match[1]\n      };\n      paragraphs.push(paragraphText);\n      words.forEach(function (word) {\n        if (!extractedText[word]) {\n          extractedText[word] = [];\n        }\n        extractedText[word].push(documentId);\n      });\n    };\n    while ((match = regex.exec(html)) !== null) {\n      _loop();\n    }\n  });\n\n  // Send the inverted index to the background script\n  chrome.runtime.sendMessage({\n    action: 'invertedIndex',\n    payload: extractedText\n  });\n  return {\n    extractedText: extractedText,\n    paragraphs: paragraphs\n  };\n}\nvar paragraphs_and_ids = [];\n\n// Listen for the message from the background script\nchrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {\n  if (message.action === 'performSearch') {\n    var results = getDOMText('p', document);\n    var invertedIndex = results.extractedText;\n    paragraphs_and_ids = results.paragraphs;\n    sendResponse(invertedIndex);\n  }\n});\nfunction filterParagraphs(paragraphs, idsToHighlight) {\n  var textToHighlight = [];\n  for (var i = 0; i < paragraphs.length; i++) {\n    var paragraph = paragraphs[i];\n    if (idsToHighlight.includes(paragraph.id)) {\n      textToHighlight.push(paragraph.text);\n    }\n  }\n  return textToHighlight;\n}\n\n//remove any previous highlighting using span element unwrapping\nfunction removePreviousHighlighting() {\n  var highlightedSpans = document.querySelectorAll('.highlight');\n  highlightedSpans.forEach(function (span) {\n    var parent = span.parentNode;\n    while (span.firstChild) {\n      parent.insertBefore(span.firstChild, span);\n    }\n    parent.removeChild(span);\n  });\n}\nfunction highlightText(paragraphsToHighlight) {\n  // Create a <style> element\n  var styleElement = document.createElement('style');\n\n  // Set the CSS rule\n  var cssRule = '.highlight { background-color: yellow; }';\n\n  // Add the CSS rule to the <style> element\n  styleElement.appendChild(document.createTextNode(cssRule));\n\n  // Append the <style> element to the <head> section\n  document.head.appendChild(styleElement);\n\n  // remove any previous highlighting\n  removePreviousHighlighting();\n  var body = document.querySelector('body');\n  var html = body.innerHTML;\n  paragraphsToHighlight.forEach(function (paragraph) {\n    var regex = new RegExp(escapeRegExp(paragraph), 'gi');\n    html = html.replace(regex, \"<span class=\\\"highlight\\\">\".concat(paragraph, \"</span>\"));\n  });\n  body.innerHTML = html;\n}\n\n// Function to escape special characters in a string for use in a regular expression\nfunction escapeRegExp(string) {\n  return string.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');\n}\n\n// Define the function that handles the click event outside of the injectFindBar listener\nfunction handleFindButtonClick() {\n  var findInput = document.getElementById('tfidf-findbar-input');\n  var searchString = findInput.value.trim();\n  console.log('User entered search string:', searchString);\n  // Remove non-word characters, split input into array of words\n  var searchArray = processTextContent(searchString);\n  console.log('User input processed to array:', searchArray);\n  // Send message to background script with user query\n  chrome.runtime.sendMessage({\n    action: 'userQuery',\n    payload: searchArray\n  }, function (response) {\n    console.log(response);\n    var paragraphsToHighlight = filterParagraphs(paragraphs_and_ids, response);\n    highlightText(paragraphsToHighlight);\n  });\n}\n\n// Listen for keypress events on the document and delegate to the find input\ndocument.addEventListener('keypress', function (event) {\n  if (event.target && event.target.id === 'tfidf-findbar-input' && event.key === 'Enter') {\n    handleFindButtonClick();\n  }\n});\n\n// Listen for click events on the document and delegate to the findbar close button\ndocument.addEventListener('click', function (event) {\n  if (event.target && event.target.id === 'tfidf-findbar-close') {\n    // Remove the findbar from the DOM\n    var findbar = document.getElementById('tfidf-findbar');\n    if (findbar) {\n      removePreviousHighlighting();\n      findbar.remove();\n    }\n  }\n});\n\n// Event listener for \"Esc\" key press\ndocument.addEventListener('keydown', function (event) {\n  if (event.key === 'Escape') {\n    var findbar = document.getElementById('tfidf-findbar');\n    if (findbar && findbar.style.display !== 'none') {\n      removePreviousHighlighting();\n      findbar.remove();\n    }\n  }\n});\n\n// Listen for keypress events on the document and delegate to the find input\ndocument.addEventListener('keypress', function (event) {\n  if (event.target && event.target.id === 'tfidf-findbar-input' && event.key === 'Enter') {\n    handleFindButtonClick();\n  }\n});\n\n// Function to inject the find bar into the DOM\nfunction injectFindBar() {\n  // Check if the find bar already exists\n  if (document.getElementById('tfidf-findbar')) {\n    return;\n  }\n\n  // Inject the find bar into the DOM\n  var findbar = document.createElement('div');\n  findbar.id = 'tfidf-findbar';\n  findbar.innerHTML = \"\\n  <div style=\\\"position: fixed; top: 0; right: 0; width: 300px; padding: 10px; background-color: #fff; border-radius: 10px; border: 1px solid #ccc; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); z-index: 9999;\\\">\\n    <input type=\\\"text\\\" id=\\\"tfidf-findbar-input\\\" placeholder=\\\"Insert keywords and hit Enter\\\" autofocus style=\\\"border: none; outline: none; width: 60%\\\" autocomplete=\\\"off\\\">\\n    <button id=\\\"tfidf-findbar-close\\\" style=\\\"position: absolute; top: 10px; right: 15px; font-weight: bold; border: none; background-color: #fff; cursor: pointer;\\\">X</button>\\n  </div>\\n  \"\n  /*\r\n    */;\n\n  document.body.appendChild(findbar);\n}\n\n// Listen for messages from the background script\nchrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {\n  if (message.action === 'injectFindBar') {\n    injectFindBar();\n    // Focus the input field\n    document.getElementById('tfidf-findbar-input').focus();\n    sendResponse();\n  }\n});\n\n//# sourceURL=webpack://ctrlf-/./src/content.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/content.js"]();
/******/ 	
/******/ })()
;