from flask import Flask, request, jsonify
from flask import send_from_directory
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)  # This will handle CORS for all routes

# Load data (in a real environment, this data would come from MongoDB)
users_data = {}
with open("structured_espeboard.cargahoraria.json", "r") as file:
    users_data = json.load(file)

def find_user_by_name(username):
    for user_entry in users_data:
        if user_entry['name'] == username:
            return user_entry
    return None

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Check if email and password are present in the request
    if not email or not password:
        return jsonify({"message": "Email or password missing from request"}), 400

    # Search for the user by email and password
    for user_entry in users_data:
        if user_entry.get('email') == email and user_entry.get('password') == password:
            return jsonify({"message": "Login successful", "user": user_entry['name']}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/horarios/<username>', methods=['GET'])
def horarios(username):
    user_details = find_user_by_name(username)
    if not user_details:
        return jsonify({"message": "User not found"}), 404
    # Filter only the schedule information (fields that are not user metadata)
    horarios = user_details.get('courses', {})
    return jsonify(horarios)

@app.route('/perfil/<username>', methods=['GET'])
def perfil(username):
    user_details = find_user_by_name(username)
    if not user_details:
        return jsonify({"message": "User not found"}), 404
    
    # Extracting specific fields for the profile
    perfil_data = {
        'name': user_details.get('name', ''),
        'ID': user_details.get('id', ''),
        'email': user_details.get('email', ''),
        'FECHA DE NACIMIENTO': user_details['other_details'].get('FECHA DE NACIMIENTO', ''),
        'firma': user_details['other_details'].get('firma', '')
    }
    return jsonify(perfil_data)


@app.route('/firma/<username>', methods=['POST'])
def firma(username):
    # Check if the post request has the file part
    if 'firma' not in request.files:
        return jsonify({"message": "No file part"}), 400
    file = request.files['firma']

    # If the user does not select a file, the browser submits an empty file without a filename.
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    if file:
        # Ensure 'uploads' directory exists
        if not os.path.exists('uploads'):
            os.makedirs('uploads')

        # Save the file in the 'uploads' directory
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)
        
        user_details = find_user_by_name(username)
        if user_details:
            user_details['other_details']['firma'] = file_path  # save the file path to your data (you may also save it to MongoDB)
            return jsonify({"message": "Signature updated successfully"}), 200
    return jsonify({"message": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
