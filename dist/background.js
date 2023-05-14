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

eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\n// function to find paragraphs that contain all keywords\nfunction intersection(keywords, invertedIndex) {\n  var result = new Set(); // or a hash map\n  var first = true; // flag to indicate the first keyword\n  var _iterator = _createForOfIteratorHelper(keywords),\n    _step;\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var keyword = _step.value;\n      var paragraph_ids = invertedIndex[keyword]; // get the list of paragraph_ids\n      if (paragraph_ids) {\n        if (first) {\n          // if this is the first keyword, add all the paragraphs to the result\n          var _iterator2 = _createForOfIteratorHelper(paragraph_ids),\n            _step2;\n          try {\n            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n              var paragraph_id = _step2.value;\n              result.add(paragraph_id); // add the paragraph_id to the result\n            }\n          } catch (err) {\n            _iterator2.e(err);\n          } finally {\n            _iterator2.f();\n          }\n          first = false; // set the flag to false\n        } else {\n          // if this is not the first keyword, intersect with the previous result\n          var temp = new Set(); // create a temporary set\n          var _iterator3 = _createForOfIteratorHelper(paragraph_ids),\n            _step3;\n          try {\n            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n              var paragraph_id = _step3.value;\n              if (result.has(paragraph_id)) {\n                // if the paragraph_id is already in the result\n                temp.add(paragraph_id); // add it to the temporary set\n              }\n            }\n          } catch (err) {\n            _iterator3.e(err);\n          } finally {\n            _iterator3.f();\n          }\n          result = temp; // update the result with the temporary set\n        }\n      } else {\n        // if there is no paragraph for this keyword, return an empty result\n        return [];\n      }\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n  return Array.from(result); // convert the set to an array and return it\n}\n\n// Listen for the keyboard shortcut\nchrome.commands.onCommand.addListener(function (command) {\n  if (command === 'performSearch') {\n    // Send a message to the content script to inject the find bar\n    chrome.tabs.query({\n      active: true,\n      currentWindow: true\n    }, function (tabs) {\n      chrome.tabs.sendMessage(tabs[0].id, {\n        action: 'performSearch'\n      });\n      chrome.tabs.executeScript(tabs[0].id, {\n        code: 'console.log(\"Injected find bar\");',\n        allFrames: true,\n        matchAboutBlank: true\n      }, function () {\n        chrome.tabs.sendMessage(tabs[0].id, {\n          action: 'injectFindBar'\n        });\n      });\n    });\n  }\n});\n\n// Listen for messages from the content script\nchrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {\n  if (message.action === 'invertedIndex') {\n    // Store the inverted index\n    invertedIndexPromise = Promise.resolve(message.payload); // resolve the promise with the inverted index\n  } else if (message.action === 'userQuery') {\n    if (invertedIndexPromise) {\n      invertedIndexPromise.then(function (invertedIndex) {\n        console.log(\"Inverted index:\", invertedIndex);\n        // find paragraphs that contain user query keywords\n        var searchArray = message.payload;\n        console.log(\"Received query words:\", searchArray);\n        var paragraph_ids = intersection(searchArray, invertedIndex);\n        sendResponse(paragraph_ids);\n      });\n    } else {\n      sendResponse({\n        error: 'Inverted index not available'\n      }); // Send an error response\n    }\n  }\n\n  return true;\n});\n\n//# sourceURL=webpack://ctrlf-/./src/background.js?");

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