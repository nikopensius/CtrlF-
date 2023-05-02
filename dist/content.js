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

eval("var STOP_WORDS = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'];\nfunction processTextContent(text) {\n  text = text.trim();\n  text = text.replace(/[^\\w\\s]/g, ''); // Remove all non-word and non-space characters\n  text = text.replace(/\\s+/g, ' ');\n  text = text.toLowerCase();\n  var words = text.split(' ').filter(function (word) {\n    return !STOP_WORDS.includes(word);\n  });\n  return words;\n}\nfunction getDOMText() {\n  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'p';\n  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;\n  var elementsToExtract = [\"p\", \"h1\", \"h2\", \"h3\", \"h4\", \"h5\", \"h6\"];\n  var extractedText = {};\n  elementsToExtract.forEach(function (elementType) {\n    var elements = root.getElementsByTagName(elementType);\n    var _loop = function _loop() {\n      var element = elements[i];\n      var text = element.textContent;\n      var words = processTextContent(text);\n      var documentId = elementType + '_' + i;\n      words.forEach(function (word) {\n        if (!extractedText[word]) {\n          extractedText[word] = new Set();\n        }\n        extractedText[word].add(documentId);\n      });\n    };\n    for (var i = 0; i < elements.length; i++) {\n      _loop();\n    }\n  });\n\n  // Send the inverted index to the background script\n  chrome.runtime.sendMessage({\n    action: 'invertedIndex',\n    payload: extractedText\n  });\n  return extractedText;\n}\n\n// Listen for the message from the background script\nchrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {\n  if (message.action === 'performSearch') {\n    var invertedIndex = getDOMText('p', document);\n    console.log('Inverted Index:', invertedIndex);\n    sendResponse(invertedIndex);\n  }\n});\n\n// Define the function that handles the click event outside of the injectFindBar listener\nfunction handleFindButtonClick(findInput) {\n  var searchString = findInput.value.trim();\n  console.log('User entered search string:', searchString);\n  // TODO: Perform search using the search string\n}\n\n// Listen for messages from the background script\nchrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {\n  if (message.action === 'injectFindBar') {\n    // Check if the find bar already exists\n    if (document.getElementById('tfidf-findbar')) {\n      return sendResponse();\n    }\n    // Inject the find bar into the DOM\n    var findbar = document.createElement('div');\n    findbar.id = 'tfidf-findbar';\n    findbar.innerHTML = \"\\n      <input type=\\\"text\\\" id=\\\"tfidf-findbar-input\\\" placeholder=\\\"Search for keywords...\\\">\\n      <button id=\\\"tfidf-findbar-search\\\">Find</button>\\n    \";\n    document.body.appendChild(findbar);\n\n    // Get the find button and text input elements\n    var findButton = document.getElementById('tfidf-findbar-search');\n    var findInput = document.getElementById('tfidf-findbar-input');\n\n    // Add event listener to the find button\n    findButton.addEventListener('click', function () {\n      handleFindButtonClick(findInput);\n    });\n\n    // Send a response back to the background script\n    sendResponse();\n  }\n});\n\n//# sourceURL=webpack://ctrlf-/./src/content.js?");

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