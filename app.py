from flask import Flask
from flask import request
from flask import render_template, url_for
from flask.ext.sqlalchemy import SQLAlchemy
import os
import json
import urllib2

#my_ip = urllib2.urlopen('http://ip.42.pl/raw').read()
my_ip = "localhost"

app = Flask(__name__, static_url_path="")
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
# db = SQLAlchemy(app)

class User(db.model):
	username = db.Column(db.String(80), unique=True, primary_key=True)
	password = db.Column(db.String(80), unique=True)
	port = db.Column(db.Integer)

	def __init__(self, username, password):
		self.username = username;
		self.password = password;


def check_username(username):
	return (username in ["bigdog", "dyue2"])

def open_ipython(username):
	port = 
	return "http://%s:%d"%(my_ip, 8888);


@app.route("/")
def hello():
	return render_template("index.html")


@app.route("/login", methods=["POST"])
def login():
	if request.method == "POST":
		username = request.form.get("username")
		print username
		if check_username(username):
			print "Hello"
			return json.dumps({"name_exist": True, "url": open_ipython(username)})
		else:
			return json.dumps({"name_exist": False})



if __name__ == '__main__':
	app.debug = True
	app.run()