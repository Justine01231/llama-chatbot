from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question", "").strip()

    if not question:
        return jsonify({"error": "Empty question"}), 400

    process = subprocess.Popen(
        ['./build/bin/llama-cli', '-m', 'models/mistral-7b.Q4_K_M.gguf', '-p', question],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd='/home/dreamscape/llama.cpp'
    )

    output, _ = process.communicate()
    return jsonify({"response": output.strip()})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
