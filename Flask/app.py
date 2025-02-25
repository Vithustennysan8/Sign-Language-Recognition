from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import cv2
import base64
import mediapipe as mp
import pickle
import logging
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

logging.basicConfig(level=logging.INFO)

# Load LSTM model for sign language words
lstm_model_path = "D:\\Study\\Engineering\\SignLanguageProject\\model\\lstm_sign_language_model_2"
lstm_model = tf.keras.models.load_model(lstm_model_path)

# Load the new SVM model
svm_model_path = "D:\Study\Engineering\SignLanguageProject\model\hand_sign_letters\svm_model.pkl"
if os.path.exists(svm_model_path):
    with open(svm_model_path, "rb") as f:
        svm_model = pickle.load(f)
    logging.info("✅ SVM model loaded successfully!")
else:
    logging.error("❌ SVM model file not found!")
    svm_model = None

# Define classes for word and letter recognition
actions = np.array(["Hello", "Yes", "No", "Please", "ThankYou", "Mother", "Father", "Love", "Baby", "Sorry", "You're welcome", "Friend", "Help", "Goodbye"])
letters = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

# Initialize MediaPipe for hand & body tracking
mp_holistic = mp.solutions.holistic
holistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5, static_image_mode=False)

sequence = []  # Store the last 30 frames

def extract_keypoints(image):
    """Extract keypoints from an image using MediaPipe"""
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = holistic.process(image_rgb)

    pose = np.array([[res.x, res.y, res.z] for res in results.pose_landmarks.landmark] if results.pose_landmarks else np.zeros((33,3)))
    left_hand = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark] if results.left_hand_landmarks else np.zeros((21, 3)))
    right_hand = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark] if results.right_hand_landmarks else np.zeros((21, 3)))

    return np.concatenate([pose.flatten(), left_hand.flatten(), right_hand.flatten()])

@app.route("/")
def index():
    return "Sign Language Prediction API is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    global sequence
    try:
        data = request.json
        image_data = data.get("image")

        if not image_data:
            return jsonify({"error": "No image data received"}), 400

        # Convert base64 to image
        img_bytes = base64.b64decode(image_data)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Extract keypoints
        keypoints = extract_keypoints(img)

        # Append keypoints to sequence
        sequence.append(keypoints)
        if len(sequence) > 30:
            sequence.pop(0)

        # Word prediction (LSTM)
        if len(sequence) == 30:
            input_sequence = np.expand_dims(np.array(sequence), axis=0)
            prediction = lstm_model.predict(input_sequence)
            word_prediction = actions[np.argmax(prediction)]
        else:
            word_prediction = "Collecting frames..."

        # # Letter prediction (SVM)
        # letter_prediction = "No Hand Detected"
        # if svm_model:
        #     hand_keypoints = keypoints[-42:]  # Extract only hand keypoints
        #     if np.any(hand_keypoints):
        #         letter_prediction = svm_model.predict([hand_keypoints])[0]

        return jsonify(word_prediction)
    
    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
