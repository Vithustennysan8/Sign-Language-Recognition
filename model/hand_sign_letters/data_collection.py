import cv2
import mediapipe as mp
import numpy as np
import os

# Directory to store hand sign data
DATA_DIR = './hand_data'
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)

# Labels (A-Z)
labels = [chr(i) for i in range(ord('A'), ord('Z') + 1)]
num_samples = 50  # Number of samples to collect per letter

# Open webcam
cap = cv2.VideoCapture(0)

for label in labels:
    label_dir = os.path.join(DATA_DIR, label)
    if not os.path.exists(label_dir):
        os.makedirs(label_dir)
    
    print(f'Collecting data for {label}')
    while len(os.listdir(label_dir)) < num_samples:
        ret, frame = cap.read()
        frame = cv2.flip(frame, 1)  # Mirror effect
        cv2.putText(frame, f'Press "s" to save {label}', (50, 50),
                   cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow('Data Collection', frame)
        
        if cv2.waitKey(25) & 0xFF == ord('s'):
            # Process frame with MediaPipe Hands
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = hands.process(rgb_frame)
            
            if results.multi_hand_landmarks:
                # Extract hand landmarks
                landmarks = []
                for lm in results.multi_hand_landmarks[0].landmark:
                    landmarks.extend([lm.x, lm.y, lm.z])
                
                # Save landmarks as .npy file
                np.save(os.path.join(label_dir, f'{len(os.listdir(label_dir))}.npy'), 
                       np.array(landmarks))
                print(f'Saved sample {len(os.listdir(label_dir))} for {label}')

cap.release()
cv2.destroyAllWindows()