from flask import Flask, request
from flask_cors import CORS

import json

import time

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

from nltk.stem import PorterStemmer

@app.route('/stemParagraphs', methods=['POST'])
def stemParagraphs():
    start_time = time.time() * 1000
    data = request.json
    paragraphs = data.get('paragraphs')
    stemmed_paragraphs = {}

    for key in paragraphs:
        stemmed_words = []
        text_content = paragraphs[key]

        # Tokenize the text content into sentences
        sentences = sent_tokenize(text_content)

        # Process each sentence
        for sentence in sentences:
            # Tokenize the sentence into words
            words = word_tokenize(sentence.lower())

            # Stem the words
            stemmer = PorterStemmer()
            stemmed_words.extend([stemmer.stem(word) for word in words])
        
        stemmed_paragraphs[key] = stemmed_words

    # Serialize the stemmed words to JSON
    json_data = json.dumps(stemmed_paragraphs)

    end_time = time.time() * 1000

    execution_time = end_time - start_time

    # Return the stemmed words
    return {'stemmed_paragraphs': json_data, "execution_time": execution_time}


@app.route('/stem', methods=['POST'])
def stem():
    start_time = time.time() * 1000
    data = request.json
    text_content = data.get('words')
    stemmed_words = []

    # Tokenize the text content into sentences
    sentences = sent_tokenize(text_content)

    # Process each sentence
    for sentence in sentences:
        # Tokenize the sentence into words
        words = word_tokenize(sentence.lower())

        # Stem the words
        stemmer = PorterStemmer()
        stemmed_words.extend([stemmer.stem(word) for word in words])

    # Serialize the stemmed words to JSON
    json_data = json.dumps(stemmed_words)

    end_time = time.time() * 1000

    execution_time = end_time - start_time

    # Return the stemmed words
    return {'stemmed_words': json_data, "execution_time": execution_time}


@app.route('/lemmatize', methods=['POST'])
def lemmatize():
    data = request.json
    text_content = data.get('words')
    output_words = []

    # Tokenize the text content into sentences
    sentences = sent_tokenize(text_content)

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

        output_words.extend(filtered_words)

    # Serialize the converted inverted_index to JSON
    json_data = json.dumps(output_words)

    # Return the lemmatized inverted index
    return {'lemmatizedWords': json_data}


if __name__ == '__main__':
    app.run()