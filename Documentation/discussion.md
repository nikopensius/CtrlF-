# Discussion

## 26.05.2023
The backend is taking time to produce the Inverted Index.
The bottleneck is between background.js and backend.py.
- these communicate via fetch and Flask.
The Inverted Index is used to to identify *paragraphs* that contain user query *keywords*.
- each paragraph is sent from background.js to backend.js separately
- the Inverted Index is built incrementally from the output of backend.js
This means that if the background.js has not finished building the Inverted Index, then the highlighting will be done incompletely.
The user will have to retype and re-send the query and they cannot be sure whether or not they got the final highlighting.
So the problem is: the Inverted Index that serves as the basis for highlighting along with the user keywords is built incrementally and this build takes more time than it takes for a user to enter the keywords. Thus, the highlighting may be done with an incomplete Inverted Index which means that the highlighting job will also be incomplete.
I have identified to possible fixes for this solution:
- Build the entire Inverted Index with one go and have the user wait until it is complete
- Build the Inverted Index incrementally as is and update the highlighting with each addition to the Inverted Index.
The first solution is very good if the most time consuming part of building the Inverted Index is the communication between client and server. This way, we could cut down on the Inverted Index build time and produce a finished highlighting job with one go.
The second solution is better if the time consuming part is the work that is done in the server. If communication is fast, but the NLP that goes on in the backend is slow, then building an Inverted Index in one go and having the user wait is not so good. Then we would like to start giving the user the highlighting results: thus showing that work is being done and already feeding the results. For big files, this is the way that Chrome's **Ctrl+F** does it as well.

So the main thing to find out, I think, is what takes longer: **the backend processing** or **the client-server communication**.

To find this out, I am going to time the backend processing tasks and the time it takes for the information to pass between the client and the server.
Timing the time of the backend processing will be simple: I can just use the Python built-in current time method orsmth like that and a little arithmetic and print the results. I wonder if I can also print the accumulated time?
Calculating the time for client-server communication will be a bit more difficult I guess?
I will have to time Python backend as well.
And then I will have to time the time between background.js sending the fetch and receiving the response. Then I will have to subtract the Python backend working time from that.
So the main thing now will be finding out the methods to use in both things and putting down the arithmetic. The final logic will be simple.

*Communication start time*
js: Send fetch request
*Backend start time*
py: Do NLP
*Backend end time*
js: Receive response
*Communication end time*

*backend time = Backend end time - Backend start time*
*communication time = (Communication end time - Communication start time) - backend time*

*backend takes longer = backend time > communication time*
*communication takes longer = !(backend takes longer)*

### Test results
Test results show that backend process takes about 50-300 times less than communication which means that 50-300 paragraphs are processed in the time it takes for a paragraph to be transported to and fro the backend.
Based on this analysis, all of the documents are first collected in the background.js and only then sent to the backend for processing.

## 27.05.2023
Navigation tools work nicely, position and count are shown, findbar looks good and finding is solid.
Sadly, it basically just works on Wikipedia. Other pages' DOM is a bit too complicated for it. So a future goal:
- customize it to also work on some other major websites for information retrieval.
In addition, just doing some random searches in articles, I found that it would be good to add a different shade of highlight to the actual search keywords, and maybe also include synonyms allready to highten the "fuzzy" aspect of ctrlF+ functionality.
- Maybe add a gradient element so that the search words and/or synonyms are a darker hue and surrounding context is a lighter hue so that more relevant parts of paragraphs could be identified?
- Also, the exact keywords could turn into an orangey color like in CtrlF, and synonyms could turn into a greener hue to show that these are also valid, but not exactly what was entered?
- Also, highlight the occurences in the scrollbar on the side of the browser.

## 16.07.2023
## RELAUNCH
### Prototype
The project left off with a finished prototype for CtrlF+.
It worked best on English language Wikipedia, the environment used for development and testing.
- English - NLTK is the NLP library used, it supports English. The NLP functionalities do not work on other language sites, but the extension is overall operable and will yield highlighting results for exact matches (this has to do with foreign words not being stemmed in NLTK, thus they retain their original form)
- Wikipedia - the site uses a simple standard for HTML formating of web page content. Everything is neatly organized into headings, subheadings, paragraphs and lists. Even in Wikipedia, some more complicated HTML structures are not processed in the CtrlF+ prototype, thus the highlighting results, allthough good for practical use cases, are not exhaustive for the web page content on Wikipedia.

The techniques and technologies used in CtrlF+ prototype are DOM manipulation for web content retrieval, parsing and highlighting tasks. A web page is broken down into documents and tagged for later highlighting purposes.
The keyword finding makes use of inverted indexing for easy document retrieval and stemming for fuzzy search.
### Next steps
There are two main branches into which the project can venture:
1. Make it work on every web page across the web.
2. Make the finding functionality better.

The first branch requires some experience with DOM manipulation, building web pages, HTML and JavaScript.
The main objective is to produce documents for the keyword finding process for any kind of web page.
Ideas for different tasks:
- compile a varied set of web pages
- analyze and categorize web pages according to style, used languages and techniques and so forth
- augment the content extraction and document tagging modules to handle all different web pages

The second branch will explore different ways to produce better highlighting results.
The main key here is to explore a wide variety of techniques in a secluded test environment.
Get to know potential stakeholders use styles and needs. The question is "how would one go about using a fuzzy find bar?"
Ideas for different tasks:
- explore different techniques: vectorization and cosine similarity, query expansion with synonyms, hypernyms...
- conduct stakeholder experiments: use volunteers, give them tasks, record finding, analyze

The main idea is to build a tool that is intuitive and robust.
For future steps, for example making the extension work across the web, the team will need to be bigger. Someone with xp in working with web pages, html, DOM and js is needed.
It would also be nice to have someone with some scientific thinking and experimentation experience on the team, good if they know NLP and Python.
