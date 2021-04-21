from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("home.html")

@app.route('/result', methods=['GET', 'POST'])
def result():
    select = request.form.get('operation')
    size = request.form.get('arr_size')
    return (str(select))