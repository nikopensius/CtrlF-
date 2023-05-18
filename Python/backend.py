from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    query = data.get('query')
    # Perform some processing on the query
    processed_query = query.upper()
    # Return the processed query
    return {'processed_query': processed_query}

if __name__ == '__main__':
    app.run()
