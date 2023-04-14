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

    - The User Interaction Handler module will be implemented in JavaScript using event listeners and DOM manipulation techniques. It will interact with the DOM of the web page to capture user input from the search bar and handle keyboard events. It will also communicate with other components of the extension, such as the Content Script and Background Script, using messaging mechanisms provided by the browser extension APIs.

    Testing and Validation

    - The User Interaction Handler module will be thoroughly tested for various scenarios, including valid and invalid search queries, different user interactions with UI elements, and error conditions. Unit testing, integration testing, and user acceptance testing will be performed to ensure the proper functioning of the module and its interaction with other components of the CtrlF+ Extension.


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
    
    - The Text Content Capturer module will be implemented in JavaScript, using DOM manipulation techniques provided by the browser extension APIs. It will utilize various methods and properties of the DOM, such as getElementById(), getElementsByTagName(), textContent, and others, to traverse and extract text content from the web page's DOM. It may also use regular expressions and string manipulation techniques to filter out irrelevant content and prepare the captured text content for further processing.

    Testing and Validation
        
    - The Text Content Capturer module will be thoroughly tested for various scenarios, including different types of web pages with varying structures and contents. Unit testing, integration testing, and regression testing will be performed to ensure the proper functioning of the module in capturing and extracting relevant text content from the web page's DOM. Test cases will cover different types of text-containing elements, nested elements, hidden elements, dynamically loaded content, and edge cases to ensure comprehensive capture of all relevant text content.


3. **Text Content Processor**
The Text Content Processor module is responsible for processing the captured text content from the Text Content Capturer module to perform various tasks, such as tokenization, lemmatization, and normalization. Additionally, this module also handles search settings, such as case sensitivity, word boundaries, and search options, including lemmatization and synonym recommendation. The processed text content will be used for indexing and searching keywords or phrases in the search functionality of the CtrlF+ Extension.

    Responsibilities

    - Tokenization: Breaking down the captured text content into individual tokens or words, based on defined rules or patterns, to prepare them for further processing.
    - Lemmatization: Reducing words to their base or root form, using linguistic rules or algorithms, to handle variations in word forms (e.g., plurals, verb conjugations) and improve search accuracy.
    - Normalization: Standardizing the format or representation of words, such as converting text to lowercase or uppercase, removing diacritics, or normalizing whitespace, to ensure consistency in search operations.
    - Handling search settings: Applying search settings, such as case sensitivity, word boundaries, and search options (e.g., lemmatization, synonym recommendation), as specified by the user or system configuration, to customize the search behavior according to the user's preferences or requirements.
    - Communicating with other components of the extension, such as the Indexing Algorithm and Search Algorithm, to provide the processed text content for indexing and searching operations.
   
    Implementation Details
   
    - The Text Content Processor module will be implemented in JavaScript, utilizing various text processing libraries or algorithms, such as natural language processing (NLP) libraries or regular expressions, to perform tokenization, lemmatization, and normalization tasks. It will also implement logic to handle search settings, such as applying case sensitivity, word boundaries, and other search options, based on user preferences or system configuration.

    Testing and Validation

    - The Text Content Processor module will be thoroughly tested for various scenarios, including different types of text content with varying word forms, cases, and search settings. Unit testing, integration testing, and regression testing will be performed to ensure the proper functioning of the module in processing text content and applying search settings accurately. Test cases will cover different types of word forms, cases, normalization rules, and search settings to ensure accurate processing and customization of search behavior according to user preferences or system configuration.





4. **UI Injector**
The UI Injector module is responsible for injecting user interface (UI) elements into the web page's Document Object Model (DOM) to display search results, highlight search matches, and provide user feedback. Additionally, this module also handles the display of UI elements for settings, options, and other user interactions related to the search functionality of the CtrlF+ Extension.

    Responsibilities

    - Injecting UI elements: Dynamically injecting UI elements, such as search results panels, highlighting elements, and feedback messages, into the web page's DOM to provide visual feedback to the user and facilitate interaction with the search functionality.
    - Displaying search results: Rendering search results in the injected UI elements, such as displaying matched keywords or phrases, providing context around the matches, and allowing the user to navigate through the results.
    - Highlighting search matches: Applying highlighting styles or effects to the matched keywords or phrases in the web page's DOM, to visually indicate the locations of the matches to the user and improve search visibility.
    - Handling UI elements for settings and options: Displaying UI elements, such as settings panels, options menus, or configuration dialogs, for the user to customize the search behavior, adjust search settings, or interact with other features related to the search functionality.
    - Managing UI interactions: Capturing user interactions, such as clicks, inputs, or gestures, on the injected UI elements and triggering appropriate actions or events, such as updating search results, applying settings changes, or providing feedback, to ensure smooth and responsive user experience.
    
    Implementation Details

    - The UI Injector module will be implemented in JavaScript, utilizing DOM manipulation techniques, such as DOM manipulation APIs or libraries (e.g., jQuery), to inject UI elements into the web page's DOM and manage UI interactions. It will also implement styles or effects, such as CSS styles or JavaScript animations, to highlight search matches and provide visual feedback to the user. Additionally, it may also utilize UI frameworks or libraries (e.g., React, Angular) to simplify UI development and management.

    Testing and Validation

    - The UI Injector module will be thoroughly tested for various scenarios, including different types of web pages, search results, highlighting styles, and user interactions. Unit testing, integration testing, and regression testing will be performed to ensure the proper functioning of the module in injecting UI elements, displaying search results, highlighting search matches, and handling UI interactions accurately. Test cases will cover different types of web pages, search results, highlighting styles, and user interactions to ensure smooth and responsive user experience and proper rendering of UI elements according to search results and user interactions.


5. **Search Coordinator**
    
    Responsibilities

    - Content Script Coordination: The Search Coordinator coordinates the interactions between different content script modules, such as the Text Content Capturer, Text Content Processor, and UI Injector, to ensure a smooth search process. It manages the flow of data and commands between these modules, orchestrating their actions to capture text content from the web page, process it, and inject UI elements for displaying search results and user feedback.
    - Search Process Flow Management: The Search Coordinator manages the overall flow of the search process. It controls the sequence of actions and events required for performing a search, such as capturing text content, processing it, and displaying search results. It ensures that the search process is executed in the correct order and handles any errors or exceptions that may occur during the process.
    - Communication with Other Components: The Search Coordinator communicates with other components of the extension, such as the background script and popup page, to trigger actions and update the search results. It sends commands and receives responses from these components to coordinate the overall search functionality. For example, it may send a request to the background script to fetch search settings from the options page, or send a message to the popup page to update the search results displayed to the user.

    Implementation Details

    The Search Coordinator module may utilize the following APIs, frameworks, and libraries to implement its functionality:

    - Chrome Extension APIs: The Chrome extension APIs provide a set of functions and events for interacting with the extension's background script, popup page, and content scripts. These APIs can be used by the Search Coordinator to send and receive messages, trigger actions, and update the search results.
    - Messaging Libraries: Libraries such as chrome.runtime.sendMessage() and chrome.runtime.onMessage can be used for sending and receiving messages between different components of the extension, including the content scripts and background script. These libraries can facilitate communication between the Search Coordinator and other components.
    - JavaScript: JavaScript is the programming language used to implement the Search Coordinator module. It provides the necessary functionality for handling events, manipulating the DOM, and coordinating the actions of different content script modules.
    - Event Handling Libraries: Libraries such as jQuery or addEventListener can be used for handling events in the content scripts. These libraries can help with managing event listeners, handling DOM events, and coordinating the flow of actions in the Search Coordinator module.
    - Custom APIs, Frameworks, or Libraries: Depending on the specific requirements of the extension, custom APIs, frameworks, or libraries may be utilized to implement the functionality of the Search Coordinator module. These may include any custom communication protocols, libraries for managing the search process flow, or other specialized tools for coordinating interactions between components.

    Testing and Validation

    - The Search Coordinator module should undergo thorough testing and validation to ensure its correctness and robustness. This may include unit testing, integration testing, and end-to-end testing of the module's functionality, as well as validation against the requirements and design specifications of the extension. Additionally, any communication between the Search Coordinator and other components should be tested and validated to ensure proper coordination and synchronization. Proper error handling and exception handling should also be implemented and tested to ensure that the module can handle unexpected scenarios gracefully.

Each content script module should have clear responsibilities and interfaces, and should be designed to be modular, efficient, and maintainable. The modules should work together seamlessly to provide the desired search functionality to the user, while minimizing impact on the performance and usability of the web page.


## Background scripts
Background scripts are responsible for managing different aspects of the background functionality of a Chrome extension. Background script modules for CtrlF+ extension include:

1. Search Coordinator: This module is responsible for coordinating the interactions between different content script modules, managing the search process flow, and communicating with other components of the extension, such as the popup page and UI Injector module, to trigger actions and update the search results.

2. Search Settings Manager: This module could be responsible for managing search settings, such as case sensitivity, word boundaries, and search options (e.g., lemmatization, synonym recommendation). It could handle storing and retrieving these settings from storage, as well as providing methods for updating and applying the settings during the search process.

3. Search History Manager: This module could be responsible for managing search history, such as storing previous search queries and results, and providing methods for retrieving and displaying the search history to the user. It could also handle clearing the search history, managing the size of the search history, and implementing search history-related features such as search suggestions based on past search queries.

4. Error Handler: This module could be responsible for capturing and handling potential errors or exceptions that may occur during the search process. It could implement logging and error reporting mechanisms to help diagnose and resolve issues, as well as providing user-friendly error messages or notifications to the user.

5. Background Task Manager: This module could be responsible for managing background tasks, such as scheduling periodic tasks for search indexing, updating search results, or handling other background processes related to the search functionality. It could implement appropriate scheduling mechanisms, such as timers or event-based triggers, and handle the coordination and execution of background tasks.

6. Communication Handler: This module could be responsible for handling inter-component communication between different components of the extension, such as content scripts, UI Injector, and Search Coordinator. It could implement message passing mechanisms, such as using the Chrome extension messaging API or other appropriate mechanisms, for sending and receiving messages between components, as well as handling message processing, error handling, and synchronization.