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

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ (() => {

eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\n// Listen for the keyboard shortcut\nchrome.commands.onCommand.addListener(function (command) {\n  if (command === 'performSearch') {\n    // Send a message to the content script to inject the find bar\n    chrome.tabs.query({\n      active: true,\n      currentWindow: true\n    }, function (tabs) {\n      chrome.tabs.sendMessage(tabs[0].id, {\n        action: 'performSearch'\n      });\n      chrome.tabs.executeScript(tabs[0].id, {\n        code: 'console.log(\"Injected find bar\");',\n        allFrames: true,\n        matchAboutBlank: true\n      }, function () {\n        chrome.tabs.sendMessage(tabs[0].id, {\n          action: 'injectFindBar'\n        });\n      });\n    });\n  }\n});\n\n// Listen for messages from the content script\nchrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {\n  if (message.action === 'invertedIndex') {\n    // Store the inverted index\n    var _invertedIndex = message.payload;\n    console.log('Received inverted index:', _invertedIndex);\n  } else if (message.action === 'updateKeywordScores') {\n    // Update the keyword scores with the new search query\n    var query = message.payload;\n    keywordScores = {};\n    var _iterator = _createForOfIteratorHelper(query.split(' ')),\n      _step;\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var keyword = _step.value;\n        if (!invertedIndex.hasOwnProperty(keyword)) {\n          continue;\n        }\n        var documents = Object.keys(invertedIndex[keyword]);\n        var idf = Math.log(Object.keys(invertedIndex).length / documents.length);\n        for (var _i = 0, _documents = documents; _i < _documents.length; _i++) {\n          var document = _documents[_i];\n          if (!keywordScores.hasOwnProperty(document)) {\n            keywordScores[document] = 0;\n          }\n          var tf = invertedIndex[keyword][document];\n          keywordScores[document] += tf * idf;\n        }\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n    console.log('Updated keyword scores:', keywordScores);\n    sendResponse();\n  } else if (message.action === 'getHighestScoringParagraphs') {\n    // Get the top N paragraphs with the highest TF-IDF scores\n    var numParagraphs = message.payload.numParagraphs;\n    var paragraphIds = Object.keys(keywordScores).sort(function (a, b) {\n      return keywordScores[b] - keywordScores[a];\n    }).slice(0, numParagraphs);\n    sendResponse(paragraphIds);\n  } else if (message.action === 'userQuery') {\n    // find paragraphs that contain user query keywords\n    var searchArray = message.payload;\n    console.log(\"Received query words:\", searchArray);\n  }\n  return true;\n});\n\n//# sourceURL=webpack://ctrlf-/./src/background.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/background.js"]();
/******/ 	
/******/ })()
;