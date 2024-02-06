#!/usr/bin/env python3
"""Flask app module"""
from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def index():
    """Route that displays title and header"""
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run(debug=True)
