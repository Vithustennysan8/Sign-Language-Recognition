from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import cv2
import base64
import mediapipe as mp
import logging

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

logging.basicConfig(level=logging.INFO)

model = tf.keras.models.load_model("D:\Study\Engineering\SignLanguageProject\Flask\lstm_sign_language_model_2")

# Define sign language classes (must match training labels)
actions = np.array(["Hello", "Yes", "No", "Please", "ThankYou"])

# Initialize MediaPipe for hand & body tracking
mp_holistic = mp.solutions.holistic
holistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5, static_image_mode=False)

# Store the last 30 frames
sequence = []

@app.route("/")
def index():
    return "Sign Language Prediction API"

def extract_keypoints(image):
    """Extract keypoints from an image using MediaPipe"""
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = holistic.process(image_rgb)


    pose = np.array([[res.x, res.y, res.z] for res in results.pose_landmarks.landmark]) if results.pose_landmarks else np.zeros((33, 3))
    left_hand = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]) if results.left_hand_landmarks else np.zeros((21, 3))
    right_hand = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]) if results.right_hand_landmarks else np.zeros((21, 3))

    return np.concatenate([pose.flatten(), left_hand.flatten(), right_hand.flatten()])

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

        # Keep only last 30 frames
        if len(sequence) > 30:
            sequence.pop(0)

        if len(sequence) == 30:  # Make prediction only if we have 30 frames
            input_sequence = np.expand_dims(np.array(sequence), axis=0)  # Reshape for model input
            prediction = model.predict(input_sequence)
            predicted_label = np.argmax(prediction)

            return jsonify({"prediction": actions[predicted_label]})

        return jsonify({"prediction": "Collecting frames..."})

    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

