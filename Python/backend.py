from flask import Flask, request
from flask_cors import CORS

import json

import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
nltk.download('stopwords')
from nltk.corpus import stopwords, wordnet
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag, word_tokenize, sent_tokenize
from collections import defaultdict

app = Flask(__name__)
CORS(app)

@app.route('/lemmatize', methods=['POST'])
def lemmatize():
    data = request.json
    word_array = data.get('wordArray')

    
@app.route('/process', methods=['POST'])
def process():
    data = request.json
    text_content = data.get('content')

    # Tokenize the text content into sentences
    sentences = sent_tokenize(text_content)

    # Initialize the lemmatized inverted index
    inverted_index = defaultdict(set)

    # Process each sentence
    for sentence in sentences:
        # Tokenize the sentence into words
        words = word_tokenize(sentence.lower())

        # Lemmatize the words
        lemmatizer = WordNetLemmatizer()
        lemmatized_words = [lemmatizer.lemmatize(word) for word in words]

        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        filtered_words = [word for word in lemmatized_words if word not in stop_words]

        # Update the inverted index
        for word in filtered_words:
            inverted_index[word].add(sentence)

    # Convert sets to lists in the inverted_index
    converted_inverted_index = {word: list(docs) for word, docs in inverted_index.items()}

    # Serialize the converted inverted_index to JSON
    json_data = json.dumps(converted_inverted_index)

    # Return the lemmatized inverted index
    return {'inverted_index': json_data}

if __name__ == '__main__':
    app.run()