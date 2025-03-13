import numpy as np
import os
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
import pickle

# Directory containing hand sign data
DATA_DIR = 'hand_data'

# Load data
X = []
y = []

for label in os.listdir(DATA_DIR):
    label_dir = os.path.join(DATA_DIR, label)
    for file in os.listdir(label_dir):
        X.append(np.load(os.path.join(label_dir, file)))
        y.append(label)

X = np.array(X)
y = np.array(y)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train SVM model
model = SVC(probability=True)
model.fit(X_train, y_train)

# Evaluate model
print("Test accuracy:", model.score(X_test, y_test))

# Save model
with open('svm_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model saved as svm_model.pkl")