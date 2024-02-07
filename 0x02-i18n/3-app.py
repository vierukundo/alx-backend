#!/usr/bin/env python3
"""Flask app module"""
from flask import Flask, render_template, request
from flask_babel import Babel


class Config(object):
    """Flask configurations class"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    """Retrieves Babel Locale"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """Route that displays title and header"""
    return render_template('3-index.html')


if __name__ == '__main__':
    app.run(debug=True)
