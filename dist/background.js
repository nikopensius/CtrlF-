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

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = \"function\" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || \"@@iterator\", asyncIteratorSymbol = $Symbol.asyncIterator || \"@@asyncIterator\", toStringTagSymbol = $Symbol.toStringTag || \"@@toStringTag\"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, \"\"); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, \"_invoke\", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: \"normal\", arg: fn.call(obj, arg) }; } catch (err) { return { type: \"throw\", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { [\"next\", \"throw\", \"return\"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if (\"throw\" !== record.type) { var result = record.arg, value = result.value; return value && \"object\" == _typeof(value) && hasOwn.call(value, \"__await\") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke(\"next\", value, resolve, reject); }, function (err) { invoke(\"throw\", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke(\"throw\", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, \"_invoke\", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = \"suspendedStart\"; return function (method, arg) { if (\"executing\" === state) throw new Error(\"Generator is already running\"); if (\"completed\" === state) { if (\"throw\" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if (\"next\" === context.method) context.sent = context._sent = context.arg;else if (\"throw\" === context.method) { if (\"suspendedStart\" === state) throw state = \"completed\", context.arg; context.dispatchException(context.arg); } else \"return\" === context.method && context.abrupt(\"return\", context.arg); state = \"executing\"; var record = tryCatch(innerFn, self, context); if (\"normal\" === record.type) { if (state = context.done ? \"completed\" : \"suspendedYield\", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } \"throw\" === record.type && (state = \"completed\", context.method = \"throw\", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, \"throw\" === methodName && delegate.iterator[\"return\"] && (context.method = \"return\", context.arg = undefined, maybeInvokeDelegate(delegate, context), \"throw\" === context.method) || \"return\" !== methodName && (context.method = \"throw\", context.arg = new TypeError(\"The iterator does not provide a '\" + methodName + \"' method\")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if (\"throw\" === record.type) return context.method = \"throw\", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, \"return\" !== context.method && (context.method = \"next\", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = \"throw\", context.arg = new TypeError(\"iterator result is not an object\"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = \"normal\", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: \"root\" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if (\"function\" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, \"GeneratorFunction\"), exports.isGeneratorFunction = function (genFun) { var ctor = \"function\" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || \"GeneratorFunction\" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, \"GeneratorFunction\")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, \"Generator\"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, \"toString\", function () { return \"[object Generator]\"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) \"t\" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if (\"throw\" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = \"throw\", record.arg = exception, context.next = loc, caught && (context.method = \"next\", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if (\"root\" === entry.tryLoc) return handle(\"end\"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, \"catchLoc\"), hasFinally = hasOwn.call(entry, \"finallyLoc\"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error(\"try statement without catch or finally\"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, \"finallyLoc\") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && (\"break\" === type || \"continue\" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = \"next\", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if (\"throw\" === record.type) throw record.arg; return \"break\" === record.type || \"continue\" === record.type ? this.next = record.arg : \"return\" === record.type ? (this.rval = this.arg = record.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, \"catch\": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if (\"throw\" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, \"next\" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n// portion of code to test communications with Python backend\n\n// Send a request to the server\nfunction sendRequestToServer(data) {\n  fetch('http://localhost:5000/process', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  }).then(function (response) {\n    return response.json();\n  }).then(function (result) {\n    // Handle the response from the server\n    console.log(result);\n    // Perform further actions with the result\n  })[\"catch\"](function (error) {\n    console.error('Error:', error);\n    // Handle errors\n  });\n}\n\n// Example usage\nvar data = {\n  content: \"The quick brown foxes jumped over the lazy dogs.\"\n};\n\n//sendRequestToServer(data);\n\n// function to send array of words to backend for stemming\nfunction sendWordsToBackend(_x) {\n  return _sendWordsToBackend.apply(this, arguments);\n}\nfunction _sendWordsToBackend() {\n  _sendWordsToBackend = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(words) {\n    var start_time, backendURL, payload, response, _data, wordsJson, backend_execution_time, end_time, total_communication_time, communication_time;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          start_time = performance.now(); // Define the backend URL for stemming\n          backendURL = 'http://localhost:5000/stem'; // Create the request payload\n          payload = {\n            words: words\n          }; // Send the request to the backend and return the stemmed words\n          _context.prev = 3;\n          _context.next = 6;\n          return fetch(backendURL, {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json'\n            },\n            body: JSON.stringify(payload)\n          });\n        case 6:\n          response = _context.sent;\n          _context.next = 9;\n          return response.json();\n        case 9:\n          _data = _context.sent;\n          wordsJson = _data.stemmed_words;\n          backend_execution_time = _data.execution_time;\n          end_time = performance.now();\n          total_communication_time = end_time - start_time;\n          communication_time = total_communication_time - backend_execution_time;\n          console.log(\"backend time:\", backend_execution_time);\n          console.log(\"communication time:\", communication_time);\n          return _context.abrupt(\"return\", JSON.parse(wordsJson));\n        case 20:\n          _context.prev = 20;\n          _context.t0 = _context[\"catch\"](3);\n          console.error('Error:', _context.t0);\n          console.log(\"Stem word array failed, revert to fallback without stemming\");\n          return _context.abrupt(\"return\", words);\n        case 25:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[3, 20]]);\n  }));\n  return _sendWordsToBackend.apply(this, arguments);\n}\nfunction stemParagraphsInBackend(_x2) {\n  return _stemParagraphsInBackend.apply(this, arguments);\n} // function to find paragraphs that contain all keywords\nfunction _stemParagraphsInBackend() {\n  _stemParagraphsInBackend = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(paragraphs) {\n    var start_time, backendURL, payload, response, _data2, paragraphsJson, backend_execution_time, end_time, total_communication_time, communication_time;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          start_time = performance.now(); // Define the backend URL for stemming\n          backendURL = 'http://localhost:5000/stemParagraphs'; // Create the request payload\n          payload = {\n            paragraphs: paragraphs\n          }; // Send the request to the backend and return the stemmed words\n          _context2.prev = 3;\n          _context2.next = 6;\n          return fetch(backendURL, {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json'\n            },\n            body: JSON.stringify(payload)\n          });\n        case 6:\n          response = _context2.sent;\n          _context2.next = 9;\n          return response.json();\n        case 9:\n          _data2 = _context2.sent;\n          paragraphsJson = _data2.stemmed_paragraphs;\n          backend_execution_time = _data2.execution_time;\n          end_time = performance.now();\n          total_communication_time = end_time - start_time;\n          communication_time = total_communication_time - backend_execution_time;\n          console.log(\"backend time:\", backend_execution_time);\n          console.log(\"communication time:\", communication_time);\n          return _context2.abrupt(\"return\", JSON.parse(paragraphsJson));\n        case 20:\n          _context2.prev = 20;\n          _context2.t0 = _context2[\"catch\"](3);\n          console.error('Error:', _context2.t0);\n        case 23:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2, null, [[3, 20]]);\n  }));\n  return _stemParagraphsInBackend.apply(this, arguments);\n}\nfunction intersection(keywords, invertedIndex) {\n  var result = new Set(); // or a hash map\n  var first = true; // flag to indicate the first keyword\n  var _iterator = _createForOfIteratorHelper(keywords),\n    _step;\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var keyword = _step.value;\n      var paragraph_ids = invertedIndex[keyword]; // get the list of paragraph_ids\n      if (paragraph_ids) {\n        if (first) {\n          // if this is the first keyword, add all the paragraphs to the result\n          var _iterator2 = _createForOfIteratorHelper(paragraph_ids),\n            _step2;\n          try {\n            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n              var paragraph_id = _step2.value;\n              result.add(paragraph_id); // add the paragraph_id to the result\n            }\n          } catch (err) {\n            _iterator2.e(err);\n          } finally {\n            _iterator2.f();\n          }\n          first = false; // set the flag to false\n        } else {\n          // if this is not the first keyword, intersect with the previous result\n          var temp = new Set(); // create a temporary set\n          var _iterator3 = _createForOfIteratorHelper(paragraph_ids),\n            _step3;\n          try {\n            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n              var paragraph_id = _step3.value;\n              if (result.has(paragraph_id)) {\n                // if the paragraph_id is already in the result\n                temp.add(paragraph_id); // add it to the temporary set\n              }\n            }\n          } catch (err) {\n            _iterator3.e(err);\n          } finally {\n            _iterator3.f();\n          }\n          result = temp; // update the result with the temporary set\n        }\n      } else {\n        // if there is no paragraph for this keyword, return an empty result\n        return [];\n      }\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n  return Array.from(result); // convert the set to an array and return it\n}\n\n////////////////////////////////////////////////////////////////////////////////////\n// Text Processing and Inverted Index logic\n\nfunction processTextContent(text) {\n  text = text.trim();\n  text = text.replace(/[^\\w\\s]/g, ' '); // Remove all non-word and non-space characters\n  text = text.replace(/\\s+/g, ' ');\n  text = text.toLowerCase();\n  return text;\n}\nvar invertedIndex = {};\nfunction buildInvertedIndex(_x3) {\n  return _buildInvertedIndex.apply(this, arguments);\n} // Listen for the keyboard shortcut\nfunction _buildInvertedIndex() {\n  _buildInvertedIndex = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(paragraphs) {\n    var _i, _Object$keys, documentId, _loop, _i2, _Object$keys2;\n    return _regeneratorRuntime().wrap(function _callee3$(_context4) {\n      while (1) switch (_context4.prev = _context4.next) {\n        case 0:\n          // Process each paragraph\n          for (_i = 0, _Object$keys = Object.keys(paragraphs); _i < _Object$keys.length; _i++) {\n            documentId = _Object$keys[_i];\n            paragraphs[documentId] = processTextContent(paragraphs[documentId]);\n          }\n          _context4.prev = 1;\n          _context4.next = 4;\n          return stemParagraphsInBackend(paragraphs);\n        case 4:\n          stemmed_paragraphs = _context4.sent;\n          _context4.next = 10;\n          break;\n        case 7:\n          _context4.prev = 7;\n          _context4.t0 = _context4[\"catch\"](1);\n          console.log(\"Error with backend stemming:\", _context4.t0);\n        case 10:\n          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {\n            var documentId, stems;\n            return _regeneratorRuntime().wrap(function _loop$(_context3) {\n              while (1) switch (_context3.prev = _context3.next) {\n                case 0:\n                  documentId = _Object$keys2[_i2];\n                  stems = stemmed_paragraphs[documentId];\n                  stems.forEach(function (stem) {\n                    if (!invertedIndex[stem]) {\n                      invertedIndex[stem] = [];\n                    }\n                    invertedIndex[stem].push(documentId);\n                  });\n                case 3:\n                case \"end\":\n                  return _context3.stop();\n              }\n            }, _loop);\n          });\n          _i2 = 0, _Object$keys2 = Object.keys(stemmed_paragraphs);\n        case 12:\n          if (!(_i2 < _Object$keys2.length)) {\n            _context4.next = 17;\n            break;\n          }\n          return _context4.delegateYield(_loop(), \"t1\", 14);\n        case 14:\n          _i2++;\n          _context4.next = 12;\n          break;\n        case 17:\n        case \"end\":\n          return _context4.stop();\n      }\n    }, _callee3, null, [[1, 7]]);\n  }));\n  return _buildInvertedIndex.apply(this, arguments);\n}\nchrome.commands.onCommand.addListener(function (command) {\n  if (command === 'performSearch') {\n    // Send a message to the content script to get the documents\n    chrome.tabs.query({\n      active: true,\n      currentWindow: true\n    }, function (tabs) {\n      chrome.tabs.sendMessage(tabs[0].id, {\n        action: 'getDocuments'\n      }, function (response) {\n        // Handle the response from the content script\n        var paragraphs = response;\n        buildInvertedIndex(paragraphs);\n      });\n      chrome.tabs.executeScript(tabs[0].id, {\n        code: 'console.log(\"Injected find bar\");',\n        allFrames: true,\n        matchAboutBlank: true\n      }, function () {\n        chrome.tabs.sendMessage(tabs[0].id, {\n          action: 'injectFindBar'\n        });\n      });\n    });\n  }\n});\n\n// Listen for messages from the content script\nchrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {\n  if (message.action === 'userQuery') {\n    var searchString = message.payload;\n    var searchDictionary = {\n      \"q0\": searchString\n    };\n    var searchDictPromise = stemParagraphsInBackend(searchDictionary);\n    console.log(invertedIndex);\n    searchDictPromise.then(function (searchDict) {\n      var searchArray = searchDict['q0'];\n      var paragraphIds = intersection(searchArray, invertedIndex);\n      sendResponse(paragraphIds);\n    })[\"catch\"](function (error) {\n      console.error(\"Error processing search array:\", error);\n      sendResponse([]);\n    });\n  }\n  return true;\n});\n\n//# sourceURL=webpack://ctrlf-/./src/background.js?");

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