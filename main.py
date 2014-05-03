"""`main` is the top level module for your Flask application."""

# Import the Flask Framework
from flask import Flask
from flask import render_template

app = Flask(__name__)
# Note: We don't need to call run() since our application is embedded within
# the App Engine WSGI application server.


@app.route('/')
def home():
    """Returns the home page for the Memory Card Game"""
    return render_template('home.html')

@app.route('/error-cache')
def cache_error_pers():
  """Returns an error page if the cached page ahs any problems loading whatsoever"""
  return render_template('error.html')
  
@app.route('/test')
def flipTest():
  """Returns a page that has the tester for the flip animation"""
  return render_template('test.html');

@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.', 404
