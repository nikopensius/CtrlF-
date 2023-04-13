# Design Document: CtrlF+ Extension

- Project Name: CtrlF+ Extension
- Document Version: 1.0
- Date: 12.04.2023
- Authors: Gustav Nikopensius
- Note: ChatGPT was used as an AI-powered language model to assist in the creation of this design document.
- Project Manager: Gustav Nikopensius

## Table of Contents

1. Introduction
2. Overview
3. Architecture
    - Components (Content scripts, Background scripts, etc.)
    - Interaction with DOM
4. Algorithms
    - Search Algorithm
    - Indexing Algorithm
5. Data Structures
    - Index Data Structure
    - Search Data Structure
6. Content Script Modules
    - User Interaction
    - Text Content Capture
    - UI Element Injection
7. User Interface
    - Popup UI
    - Options UI
8. Interaction Flow
    - Search Flow
    - UI Interaction Flow
9. Testing and Validation
    - Test Scenarios
    - Validation Approach
10. References

## Introduction

The design document for the CtrlF+ extension outlines the architecture, algorithms, and data structures that will be used to develop the extension. It provides a comprehensive overview of the design decisions, components, and interactions of the extension, serving as a guide for the development team. The design document aims to ensure that the CtrlF+ extension is developed efficiently and effectively, with a clear understanding of the technical implementation details. This document will provide insights into the organization, structure, and implementation of the extension, laying the foundation for its successful development.

## Overview

The CtrlF+ Extension is a browser extension that enhances the search functionality in web pages by providing advanced search options and settings. It allows users to quickly and efficiently search for keywords or phrases in the text content of web pages, and provides a seamless user experience with intuitive UI elements and optimized search algorithms.

This design document provides an in-depth overview of the architecture, algorithms, and data structures used in the CtrlF+ Extension. It outlines the different components of the extension, including content scripts, background scripts, popup pages, and options pages, and how they interact with each other. It also describes the algorithms and data structures used for indexing and searching text content, as well as the modules and user interface elements involved in the search process.

This document serves as a comprehensive guide for the development team, providing detailed insights into the design decisions and technical aspects of the CtrlF+ Extension. It will aid in the understanding of the extension's inner workings and serve as a reference for implementation, testing, and validation.

## Architecture

### Content scripts
The content script module for CtrlF+ can be organized into different functionalities, responsible for specific tasks related to the search functionality. Here are some possible content script modules:

1. **User Interaction Handler**
The User Interaction Handler module is responsible for handling user interactions with the search functionality of the CtrlF+ Extension. It captures user input from the search bar and handles keyboard events for search triggers, such as pressing Enter. It also responds to user interactions with UI elements related to search, such as buttons and checkboxes.

    Responsibilities

    - Capture user input from the search bar and validate input for keywords or phrases.
    - Handle keyboard events for search triggers, such as Enter key, to initiate the search process.
    - Respond to user interactions with UI elements related to search, such as buttons for search options, checkboxes for settings, etc.
    - Validate user input and provide feedback to the user on search queries, settings, and options.
    - Communicate with other components of the extension, such as the Content Script and Background Script, to trigger search operations and update the UI accordingly.
    - Handle error conditions and provide error messages to the user for any search-related issues.

    Implementation Details

        The User Interaction Handler module will be implemented in JavaScript using event listeners and DOM manipulation techniques. It will interact with the DOM of the web page to capture user input from the search bar and handle keyboard events. It will also communicate with other components of the extension, such as the Content Script and Background Script, using messaging mechanisms provided by the browser extension APIs.

    Testing and Validation

        The User Interaction Handler module will be thoroughly tested for various scenarios, including valid and invalid search queries, different user interactions with UI elements, and error conditions. Unit testing, integration testing, and user acceptance testing will be performed to ensure the proper functioning of the module and its interaction with other components of the CtrlF+ Extension.


2. **Text Content Capturer**
The Text Content Capturer module is responsible for capturing and extracting text content from the web page's DOM (Document Object Model), including elements such as paragraphs, headings, lists, and other relevant text nodes. This module plays a crucial role in the search functionality of the CtrlF+ Extension, as it gathers the text content that will be used for indexing and searching keywords or phrases.

    Responsibilities

    - Traversing the DOM of the web page and identifying relevant text nodes, such as paragraphs, headings, lists, and other text-containing elements.
    - Extracting the text content from the identified nodes and storing it in a structured format for further processing.
    - Filtering out irrelevant content, such as advertisements, scripts, and other non-textual elements, that may not be relevant for search purposes.
    - Preparing the captured text content for further processing, such as removing HTML tags, normalizing whitespace, and converting text to lowercase or uppercase, as needed.
    - Handling edge cases, such as text content within nested elements, hidden elements, or dynamically loaded content, to ensure comprehensive capture of all relevant text content.
    - Communicating with other components of the extension, such as the Indexing Algorithm and Search Algorithm, to provide the captured text content for indexing and searching operations.
    
    Implementation Details
    
        The Text Content Capturer module will be implemented in JavaScript, using DOM manipulation techniques provided by the browser extension APIs. It will utilize various methods and properties of the DOM, such as getElementById(), getElementsByTagName(), textContent, and others, to traverse and extract text content from the web page's DOM. It may also use regular expressions and string manipulation techniques to filter out irrelevant content and prepare the captured text content for further processing.

    Testing and Validation
        
        The Text Content Capturer module will be thoroughly tested for various scenarios, including different types of web pages with varying structures and contents. Unit testing, integration testing, and regression testing will be performed to ensure the proper functioning of the module in capturing and extracting relevant text content from the web page's DOM. Test cases will cover different types of text-containing elements, nested elements, hidden elements, dynamically loaded content, and edge cases to ensure comprehensive capture of all relevant text content.


3. **Text Content Processor**
The Text Content Processor module is responsible for processing the captured text content from the Text Content Capturer module to perform various tasks, such as tokenization, lemmatization, and normalization. Additionally, this module also handles search settings, such as case sensitivity, word boundaries, and search options, including lemmatization and synonym recommendation. The processed text content will be used for indexing and searching keywords or phrases in the search functionality of the CtrlF+ Extension.

    Responsibilities

    - Tokenization: Breaking down the captured text content into individual tokens or words, based on defined rules or patterns, to prepare them for further processing.
    - Lemmatization: Reducing words to their base or root form, using linguistic rules or algorithms, to handle variations in word forms (e.g., plurals, verb conjugations) and improve search accuracy.
    - Normalization: Standardizing the format or representation of words, such as converting text to lowercase or uppercase, removing diacritics, or normalizing whitespace, to ensure consistency in search operations.
    - Handling search settings: Applying search settings, such as case sensitivity, word boundaries, and search options (e.g., lemmatization, synonym recommendation), as specified by the user or system configuration, to customize the search behavior according to the user's preferences or requirements.
    - Communicating with other components of the extension, such as the Indexing Algorithm and Search Algorithm, to provide the processed text content for indexing and searching operations.
   
    Implementation Details
   
        The Text Content Processor module will be implemented in JavaScript, utilizing various text processing libraries or algorithms, such as natural language processing (NLP) libraries or regular expressions, to perform tokenization, lemmatization, and normalization tasks. It will also implement logic to handle search settings, such as applying case sensitivity, word boundaries, and other search options, based on user preferences or system configuration.

    Testing and Validation

        The Text Content Processor module will be thoroughly tested for various scenarios, including different types of text content with varying word forms, cases, and search settings. Unit testing, integration testing, and regression testing will be performed to ensure the proper functioning of the module in processing text content and applying search settings accurately. Test cases will cover different types of word forms, cases, normalization rules, and search settings to ensure accurate processing and customization of search behavior according to user preferences or system configuration.





4. UI Injector: This module can inject UI elements into the web page's DOM to display search results, highlight search matches, and provide user feedback. It can also handle the display of UI elements for settings, options, and other user interactions related to the search functionality.

5. Search Coordinator: This module can coordinate the interactions between different content script modules, manage the search process flow, and communicate with other components of the extension, such as the background script and popup page, to trigger actions and update the search results.

Each content script module should have clear responsibilities and interfaces, and should be designed to be modular, efficient, and maintainable. The modules should work together seamlessly to provide the desired search functionality to the user, while minimizing impact on the performance and usability of the web page.