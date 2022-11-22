"""Server for JavaScript: Sharkwords."""

from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def homepage():
    return render_template("index.html")


@app.route("/demo")
def demo():
    return render_template("demo.html")


@app.route("/sharkwords")
def sharkwords():
    return render_template("sharkwords.html")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
