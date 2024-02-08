#!/usr/bin/env python3
"""Flask app module"""
from flask import Flask, render_template, request, g
from flask_babel import Babel


class Config(object):
    """Flask configurations class"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user(user_id):
    """returns a user dictionary or None if the ID cannot
    be found or if login_as was not passed."""
    return users.get(user_id, None)


@app.before_request
def before_request():
    """Get user if any, and set it as a global on flask.g.user"""
    if 'login_as' in request.args:
        user_id = request.args.get('login_as')
        g.user = get_user(int(user_id))


@babel.localeselector
def get_locale():
    """Retrieves Babel Locale"""
    if g.user and 'locale' in g.user:
        return g.user['locale']
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """Route that displays title and header"""
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run(debug=True)
