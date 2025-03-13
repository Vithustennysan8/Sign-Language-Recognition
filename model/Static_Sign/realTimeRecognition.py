import cv2
import numpy as np
import mediapipe as mp
import tensorflow as tf
import pickle

# Load trained Keras model
model = tf.keras.models.load_model('sign_language_model.keras')

# Load label encoder to decode predictions
with open('label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)
mp_draw = mp.solutions.drawing_utils

def adjust_brightness(img, beta):
    """Adjust brightness using HSV color space."""
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    hsv[:, :, 2] = np.clip(hsv[:, :, 2] + beta, 0, 255)
    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

# Create window with brightness trackbar
cv2.namedWindow('Hand Sign Recognition')
cv2.createTrackbar('Brightness', 'Hand Sign Recognition', 0, 100, lambda x: None)

cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Mirror effect
    frame = cv2.flip(frame, 1)
    frame_height, frame_width = frame.shape[:2]
    
    # Convert to RGB for MediaPipe
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb_frame)
    
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Draw hand landmarks
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            
            # Extract ROI coordinates
            x_coords = [int(lm.x * frame_width) for lm in hand_landmarks.landmark]
            y_coords = [int(lm.y * frame_height) for lm in hand_landmarks.landmark]
            x_min, x_max = min(x_coords), max(x_coords)
            y_min, y_max = min(y_coords), max(y_coords)
            
            # Add padding and ensure within frame bounds
            padding = 20
            x_min = max(0, x_min - padding)
            y_min = max(0, y_min - padding)
            x_max = min(frame_width, x_max + padding)
            y_max = min(frame_height, y_max + padding)
            
            # Extract and adjust brightness of ROI
            roi = frame[y_min:y_max, x_min:x_max]
            brightness = cv2.getTrackbarPos('Brightness', 'Hand Sign Recognition') - 50
            if roi.size != 0:
                roi = adjust_brightness(roi, brightness)
                frame[y_min:y_max, x_min:x_max] = roi
            
            # Prepare landmarks for prediction
            landmarks = []
            for lm in hand_landmarks.landmark:
                landmarks.extend([lm.x, lm.y, lm.z])
            
            # Convert to NumPy array and reshape for prediction
            landmarks = np.array(landmarks, dtype=np.float32).reshape(1, -1)
            
            # Make prediction using the TensorFlow model
            predictions = model.predict(landmarks)
            predicted_index = np.argmax(predictions)  # Get class index
            confidence = np.max(predictions)  # Get confidence score
            predicted_class = label_encoder.inverse_transform([predicted_index])[0]  # Convert back to label
            
            # Display prediction
            cv2.putText(frame, f"{predicted_class} ({confidence:.2f})", 
                        (x_min, y_min - 10), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    cv2.imshow('Hand Sign Recognition', frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
