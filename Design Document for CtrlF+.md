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
The Search Coordinator module is responsible for coordinating the interactions between different content script modules, managing the search process flow, and communicating with other components of the extension, such as the background script and popup page, to trigger actions and update the search results.
    
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

1. Coordination with Content Scripts Module
The Coordination with Content Scripts module in the background script is responsible for managing the coordination and communication between different content script modules and other components of the extension. It serves as an intermediary for communication between content scripts and other components, such as the user interface, storage management, and other background script modules. This module handles messages, events, and triggers from content scripts and triggers appropriate actions in response.

    Responsibilities
    - Facilitating communication and coordination among different content script modules and other components of the extension.
    - Handling messages, events, and triggers from content scripts and processing them appropriately.
    - Orchestrating actions in response to messages or events from content scripts, such as updating the search results, managing storage, or triggering UI updates.
    
    Implementation Details
    - Utilizing the chrome.runtime or chrome.extension APIs in the background script to send and receive messages between content scripts and other components of the extension.
    - Setting up event listeners in the background script to listen for events triggered by content scripts.
    - Implementing logic to process incoming messages or events from content scripts, including data validation, error handling, and triggering appropriate actions.
    - Coordinating with other background script modules or components of the extension to ensure smooth communication and coordination among different parts of the extension.
    
    Testing and Validation
    - Testing the coordination and communication between content scripts and other components of the extension using unit tests, integration tests, and end-to-end tests.
    - Validating the correct handling of messages, events, and triggers from content scripts and verifying the expected actions are triggered in response.
    - Testing error scenarios, such as invalid messages or unexpected events, to ensure proper error handling and graceful degradation of functionality.
    - Conducting thorough testing and validation to ensure the robustness and reliability of the Coordination with Content Scripts module and its interaction with other components of the extension.

2. Search Process Flow Module
The Search Process Flow Module is responsible for managing the overall flow of the search process within the extension. It orchestrates the different stages of the search process, including triggering searches, handling search results, and updating the user interface (UI) accordingly.

    Responsibilities:
    - Monitoring user input: This module constantly monitors user input, such as text input in the search box or changes in the search settings.
    - Triggering searches: Based on the user input, the Search Process Flow Module triggers searches by sending appropriate requests to the search engine or content scripts.
    - Handling search results: Once search results are returned, this module processes and parses the results to extract relevant information, such as matching text snippets or search result URLs.
    - Updating UI: The Search Process Flow Module is responsible for updating the user interface (UI) to reflect the latest search results. This includes displaying search results in the UI, updating search result counts, and highlighting matched text in the search results.

    Implementation Details:
    - Message passing: The Search Process Flow Module communicates with other components of the extension, such as content scripts and the background script, using message passing mechanisms provided by the extension framework. It sends and receives messages to trigger searches, receive search results, and update the UI.
    - Event handling: This module listens for relevant events, such as user input events or search result events, and responds accordingly by triggering appropriate actions.
    - Parsing and processing: The Search Process Flow Module processes the search results returned by content scripts or search engine APIs to extract relevant information, such as matching text snippets or URLs, and stores them for further use.

    Testing and Validation:
    - Unit testing: This module should be thoroughly tested using unit testing techniques to ensure its correctness and robustness. Unit tests should cover different scenarios, such as different types of user input, various search result formats, and error cases.
    - Integration testing: Integration testing should be performed to validate the coordination and communication between the Search Process Flow Module and other components, such as content scripts and the background script. This should include testing message passing, event handling, and UI updates.
    - User testing: The Search Process Flow Module should also be tested from a user perspective to ensure that the search process flow is smooth, efficient, and provides the expected results. User feedback should be collected and incorporated into the validation process to identify and fix any potential issues.


3. Inter-component Communication Module
The Inter-component Communication Module is responsible for handling communication between different components of the extension, such as the popup page, settings, and other background script modules. It implements message passing techniques to exchange data and instructions between components, ensuring smooth data flow and action coordination.

    Responsibilities:
    
    - Facilitating communication: This module enables communication between different components of the extension by implementing message passing techniques. It provides a way for components to send and receive messages, allowing them to exchange data and instructions.
    - Coordinating actions: The Inter-component Communication Module ensures that different components of the extension are coordinated in their actions. For example, it may receive a message from a popup page requesting a certain action to be performed, and then relay that message to the appropriate background script module or content script to trigger the action.
    - Managing data flow: This module handles the flow of data between components, ensuring that data is exchanged efficiently and accurately. It may be responsible for encoding and decoding data, validating data integrity, and ensuring that data is sent and received in the correct format.
    - Handling errors: The Inter-component Communication Module may also handle errors that may occur during communication, such as message delivery failures or data validation errors. It should provide appropriate error handling mechanisms to handle such situations gracefully and ensure that the extension continues to function correctly.
    
    Implementation Details:
    
    - Message passing: This module uses message passing mechanisms provided by the extension framework to send and receive messages between components. It may use various message passing techniques, such as chrome.runtime.sendMessage and chrome.runtime.onMessage for communication between background scripts and content scripts, or chrome.extension.sendMessage and chrome.extension.onMessage for communication between other components, such as popup pages and settings.
    - Data validation: The Inter-component Communication Module may implement data validation mechanisms to ensure that data exchanged between components is valid and in the correct format. This may include checking for data types, data lengths, and data integrity to prevent data corruption or security vulnerabilities.
    - Error handling: This module should provide appropriate error handling mechanisms to handle errors that may occur during communication, such as message delivery failures or data validation errors. This may include logging errors, displaying error messages to users, and taking corrective actions to recover from errors and maintain the stability and functionality of the extension.
    
    Testing and Validation:
    
    - Unit testing: This module should be thoroughly tested using unit testing techniques to ensure its correctness and robustness. Unit tests should cover different scenarios, such as sending and receiving messages between different components, handling different types of data, and handling error conditions.
    - Integration testing: Integration testing should be performed to validate the communication between the Inter-component Communication Module and other components of the extension. This should include testing message passing, data validation, and error handling in different scenarios and configurations.
    - User testing: The Inter-component Communication Module should also be tested from a user perspective to ensure that the communication between components is seamless and transparent to users. User feedback should be collected and incorporated into the validation process to identify and fix any potential issues.

4. Storage Management Module
The Storage Management Module is responsible for managing the storage for the extension, including storing search settings, options, and other relevant data. It ensures persistent storage of user preferences, search history, and other data, and handles storage-related operations, such as reading, writing, and updating data.

    Responsibilities:
    - Persistent storage: This module ensures that data stored by the extension is persistent, meaning it is stored across different sessions of the extension and remains available even after the extension is closed or the browser is restarted. It is responsible for managing the storage space allocated to the extension and ensuring that data is stored securely and efficiently.
    - Data storage operations: The Storage Management Module handles various storage-related operations, such as reading, writing, and updating data. It provides methods and APIs to interact with the storage system, allowing other components of the extension to store and retrieve data as needed. It may also implement data validation mechanisms to ensure that data stored in the storage is valid and in the correct format.
    - Data synchronization: This module may also handle data synchronization between different components of the extension or between different instances of the extension running on different devices or browsers. It ensures that data remains consistent and up-to-date across different parts of the extension and different instances of the extension running on different environments.
    - Error handling: The Storage Management Module should provide appropriate error handling mechanisms to handle errors that may occur during storage operations, such as storage failures, data corruption, or other storage-related issues. It should ensure that errors are properly logged, reported, and handled, and that data integrity is maintained.
    
    Implementation Details:
    - Storage APIs: This module may use storage APIs provided by the extension framework, such as chrome.storage API for Chrome extensions or browser.storage API for Firefox extensions, to interact with the storage system. These APIs provide methods for reading, writing, and updating data in different types of storage, such as local storage, sync storage, or extension-specific storage.
    - Data validation: The Storage Management Module may implement data validation mechanisms to ensure that data stored in the storage is valid and in the correct format. This may include checking for data types, data lengths, and data integrity to prevent data corruption or security vulnerabilities.
    - Data synchronization: If data synchronization is required, this module may implement techniques such as push or pull synchronization, conflict resolution, and data merging to ensure that data remains consistent and up-to-date across different components or instances of the extension.
    - Encryption and security: The Storage Management Module may implement encryption and other security measures to protect sensitive data stored in the storage. This may include encrypting data before storing it in the storage, implementing access controls to restrict access to stored data, and using secure storage options provided by the extension framework, such as encrypted local storage or sync storage.
    
    Testing and Validation:
    - Unit testing: This module should be thoroughly tested using unit testing techniques to ensure its correctness and robustness. Unit tests should cover different scenarios, such as reading, writing, and updating data, handling different types of data, and handling error conditions.
    - Integration testing: Integration testing should be performed to validate the interaction between the Storage Management Module and other components of the extension that use the stored data. This should include testing data synchronization, data validation, and error handling in different scenarios and configurations.
    - User testing: The Storage Management Module should also be tested from a user perspective to ensure that data is stored persistently, and user preferences and other data are properly maintained across different sessions and instances of the extension. User feedback should be collected and incorporated into the validation process to identify and fix any potential issues.

5. Error Handling Module
The Error Handling Module is responsible for implementing error handling mechanisms to ensure the robustness and reliability of the search functionality in the extension. It logs errors, handles unexpected scenarios, and provides graceful degradation in case of errors, preventing crashes or unexpected behavior.

    Responsibilities:
    - Error logging: Logs errors that occur during the execution of the extension, capturing error details for debugging and troubleshooting purposes.
    - Error handling: Handles errors in a graceful manner, implementing error recovery mechanisms such as retrying failed operations, falling back to default values, or providing user-friendly error messages.
    - Unexpected scenario handling: Anticipates and handles unexpected scenarios that may occur during the search process or other operations of the extension, ensuring smooth recovery.
    - Graceful degradation: Ensures that the extension gracefully degrades in case of errors, continuing to function with limited features or reduced capacity.
    
    Implementation Details:
    - Error logging: Uses logging APIs provided by the extension framework or custom logging mechanisms to capture and log errors.
    - Error recovery: Implements error recovery mechanisms using conditional statements, try-catch blocks, or other error-handling techniques.
    - Unexpected scenario handling: Implements error handling logic to identify and handle unexpected scenarios in a robust manner.
    - Graceful degradation: Implements fallback mechanisms such as using default settings, displaying partial results, or disabling certain features.
    
    Testing and Validation:
    - Error simulation: Tests the Error Handling Module by simulating different types of errors to ensure error handling mechanisms are working as expected.
    - Error recovery testing: Tests the error recovery mechanisms to ensure proper recovery from different types of errors.
    - Graceful degradation testing: Tests the fallback mechanisms to ensure graceful degradation of the extension in the presence of errors.

6. Event Monitoring Module
The Event Monitoring Module is responsible for monitoring events and triggers from various sources, such as user interactions, system events, and extension events. It handles events, triggers appropriate actions, and coordinates the flow of information and actions among different components of the extension.

    Responsibilities:
    - Event monitoring: Monitors events from various sources, including user interactions (e.g., clicks, key presses), system events (e.g., page loads, extension installation), and extension events (e.g., messages from content scripts, background script events).
    - Event handling: Handles events by triggering appropriate actions or passing the events to relevant components for further processing.
    - Flow coordination: Coordinates the flow of information and actions among different components of the extension based on the events that are monitored, ensuring proper communication and coordination among components.
    Implementation Details:
    - Event listeners: Implements event listeners or event handling mechanisms provided by the extension framework or custom event handling techniques to capture and process events.
    - Event dispatching: Dispatches events to relevant components or functions based on event types or event data.
    Flow coordination: Implements logic to determine the appropriate actions to be taken based on the events that are monitored and coordinates the flow of information and actions among different components.
    
    Testing and Validation:
    - Event simulation: Tests the Event Monitoring Module by simulating various types of events to ensure event monitoring and handling mechanisms are working as expected.
    - Event coordination testing: Tests the flow coordination logic to ensure proper communication and coordination among components based on the events that are monitored.
    - Integration testing: Validates the interaction and coordination of the Event Monitoring Module with other components of the extension during integration testing to ensure smooth functioning of the extension as a whole.

Each of these modules works together to ensure smooth operation and coordination of different components in the background script of the CtrlF+ extension, providing reliable and efficient search functionality for users.