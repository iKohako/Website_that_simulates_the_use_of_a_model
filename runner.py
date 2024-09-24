from flask import Flask, send_from_directory
app = Flask(__name__)

@app.route('/<C:\Webre\script.js:C:\Webre\script.js>', methods=['GET'])
def static_proxy(path):
     return send_from_directory('C:\Webre\styles.css', path)

if __name__ == '__main__':
     app.run(debug=True)