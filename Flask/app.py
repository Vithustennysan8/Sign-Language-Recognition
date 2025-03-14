from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from PIL import Image
import cv2
import base64
import mediapipe as mp
import pickle
import logging
import os
import string 
from cvzone.HandTrackingModule import HandDetector


app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

detecter = HandDetector(maxHands=1)
offset = 20
imgSize = 300

# Load LSTM model for sign language words
lstm_model_path = "D:\Study\Engineering\SignLanguageProject\model\lstm_sign_language_model_2"
lstm_model = tf.keras.models.load_model(lstm_model_path)

model = tf.keras.models.load_model("D:\Study\Engineering\SignLanguageProject\model\Static_Sign\sign_language_model2.keras")

# Define classes for word and letter recognition
actions = np.array(["Hello", "Yes", "No", "Please", "ThankYou"])
labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

# Initialize MediaPipe for hand & body tracking
mp_holistic = mp.solutions.holistic
holistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5, static_image_mode=False)

sequence = []  # Store the last 30 frames

def extract_keypoints(image):
    """Extract keypoints from an image using MediaPipe"""
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    try:
        results = holistic.process(image_rgb)

        if not results.pose_landmarks and not results.left_hand_landmarks and not results.right_hand_landmarks:
            print("Warning: No landmarks detected. Returning empty array.")
            return np.zeros((33*3 + 21*3 + 21*3,))  # Return zeros instead of getting stuck

        pose = np.array([[res.x, res.y, res.z] for res in results.pose_landmarks.landmark] if results.pose_landmarks else np.zeros((33,3)))
        left_hand = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark] if results.left_hand_landmarks else np.zeros((21, 3)))
        right_hand = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark] if results.right_hand_landmarks else np.zeros((21, 3)))

        return np.concatenate([pose.flatten(), left_hand.flatten(), right_hand.flatten()])

    except Exception as e:
        print(f"Error extracting keypoints: {e}")
        return np.zeros((33*3 + 21*3 + 21*3,))  # Return empty array instead of hanging


# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.7)

# Load label encoder to decode predictions
with open('D:\Study\Engineering\SignLanguageProject\model\Static_Sign\label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

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
            sequence = sequence[-30:]  # Keep only the last 30 frames


        # Word prediction (LSTM)
        if len(sequence) == 30:
            input_sequence = np.expand_dims(np.array(sequence), axis=0)
            prediction = lstm_model.predict(input_sequence, verbose=0)
            word_prediction = actions[np.argmax(prediction)]
        else:
            word_prediction = "Collecting frames..."

        return jsonify({"prediction": word_prediction})
    
    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500
    

@app.route("/letter_predict", methods=["POST"])
def letter_predict():
    try:
        data = request.json
        image_data = data.get("image")

        if not image_data:
            return jsonify({"error": "No image data received"}), 400

        # Convert Base64 to OpenCV image
        img_bytes = base64.b64decode(image_data)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({"error": "Invalid image format"}), 400

        img = cv2.flip(img, 1)
        
        # Convert to RGB for MediaPipe
        rgb_frame = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)
        
        if results.multi_hand_landmarks:
            hand = results.multi_hand_landmarks[0]  # Take the first detected hand
            
            # Prepare landmarks for prediction
            landmarks = []
            for lm in hand.landmark:
                landmarks.extend([lm.x, lm.y, lm.z])
            
            # Convert to NumPy array and reshape for prediction
            landmarks = np.array(landmarks, dtype=np.float32).reshape(1, -1)
            
            # Make prediction using the TensorFlow model
            predictions = model.predict(landmarks)
            predicted_index = np.argmax(predictions)  # Get class index
            confidence = float(np.max(predictions))  # Get confidence score
            letter = labels[predicted_index]  # Get the corresponding letter

            return jsonify({"letter": letter, "confidence": confidence})
        
        else:
            return jsonify({"error": "No hand detected"}), 400

    except Exception as e:
        import traceback
        print("Error:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
