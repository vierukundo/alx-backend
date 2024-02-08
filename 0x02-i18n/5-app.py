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


def get_user():
    """returns a user dictionary or None if the ID cannot
    be found or if login_as was not passed."""
    if 'login_as' in request.args:
        user_id = request.args.get('login_as')
        print(int(user_id))
        return users.get(int(user_id))
    return None


@app.before_request
def before_request():
    """Get user if any, and set it as a global on flask.g.user"""
    g.user = get_user()
    print(g.user)


@babel.localeselector
def get_locale():
    """Retrieves Babel Locale"""
    if 'locale' in request.args:
        requested_locale = request.args.get('locale')
        if requested_locale in app.config['LANGUAGES']:
            return requested_locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """Route that displays title and header"""
    return render_template('5-index.html', user=g.user)


if __name__ == '__main__':
    app.run(debug=True)
