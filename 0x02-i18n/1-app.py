#!/usr/bin/env python3
"""Flask app module"""
from flask import Flask, render_template
from flask_babel import Babel


class Config(object):
    """Flask configurations class"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def index():
    """Route that displays title and header"""
    return render_template('1-index.html')
