(function () {
  'use strict';

  /*
   * Copyright (c) AXA Group Operations Spain S.A.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */

  const Nlp = require('./nlp');
  const ContextManager = require('./context-manager');

  module.exports = {
    Nlp,
    ContextManager,
  };

  /*
   * Copyright (c) AXA Group Operations Spain S.A.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */

  const Among = require('./among');
  const ArrToObj = require('./arr-to-obj');
  const BaseStemmer = require('./base-stemmer');
  const containerBootstrap = require('./container-bootstrap');
  const Clonable = require('./clonable');
  const { Container, defaultContainer } = require('./container');
  const Normalizer = require('./normalizer');
  const ObjToArr = require('./obj-to-arr');
  const Stemmer = require('./stemmer');
  const Stopwords = require('./stopwords');
  const Tokenizer = require('./tokenizer');
  const Timer = require('./timer');
  const logger = require('./logger');
  const {
    hasUnicode,
    unicodeToArray,
    asciiToArray,
    stringToArray,
    compareWildcars,
    loadEnv,
  } = require('./helper');
  const MemoryStorage = require('./memory-storage');
  const uuid = require('./uuid');
  const dock = require('./dock');
  const Context = require('./context');

  async function dockStart(settings, mustLoadEnv) {
    await dock.start(settings, mustLoadEnv);
    return dock;
  }

  module.exports = {
    Among,
    ArrToObj,
    BaseStemmer,
    containerBootstrap,
    Clonable,
    Container,
    defaultContainer,
    hasUnicode,
    unicodeToArray,
    asciiToArray,
    stringToArray,
    compareWildcars,
    loadEnv,
    Normalizer,
    ObjToArr,
    Stemmer,
    Stopwords,
    Tokenizer,
    Timer,
    logger,
    MemoryStorage,
    uuid,
    dock,
    Context,
    dockStart,
  };

  const STOP_WORDS = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'];

  function processTextContent(text, nlp) {
    text = text.trim();
    text = text.replace(/\s+/g, ' ');
    text = text.toLowerCase();
    const words = text.split(' ').filter(word => !STOP_WORDS.includes(word));
    const lemmas = nlp(words.join(' ')).out('array');
    const processedText = lemmas.join(' ');
    return processedText;
  }

  function splitTextContentIntoWords(text, nlp) {
    text = processTextContent(text, nlp);
    const words = text.split(' ');
    return words;
  }

  function getDOMText(selector = 'p', root = document, nlp) {
    const elementsToExtract = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
    const extractedText = [];

    elementsToExtract.forEach(elementType => {
      const elements = root.getElementsByTagName(elementType);
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const text = element.textContent;
        const processedText = processTextContent(text, nlp);
        const documentId = elementType + '_' + i;
        extractedText.push({ id: documentId, text: processedText });
      }
    });

    const invertedIndex = {};
    extractedText.forEach(doc => {
      const words = splitTextContentIntoWords(doc.text, nlp);
      words.forEach(word => {
        if (!invertedIndex[word]) {
          invertedIndex[word] = new Set();
        }
        invertedIndex[word].add(doc.id);
      });
    });

    console.log('Inverted Index:', invertedIndex);
    return invertedIndex;
  }

  // Listen for the message from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'performSearch') {
      // Retrieve the DOM text and build the inverted index
      const nlp = window.nlp; // get the NLP library object
      const invertedIndex = getDOMText('p', document, nlp); // pass nlp parameter to the getDOMText function

      console.log('Inverted Index:', invertedIndex);

      // Send the inverted index to the background script
      sendResponse(invertedIndex);
    }
  });

})();
