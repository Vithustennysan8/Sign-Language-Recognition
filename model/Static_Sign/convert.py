import pickle
from sklearn.svm import SVC
import tensorflow as tf
from tensorflow import keras

with open("svm_model.pkl", "rb") as file:
    model = pickle.load(file)

# Convert to Keras
input_dim = model.support_vectors_.shape[1]  # Feature count

keras_model = keras.Sequential([
    keras.layers.InputLayer(input_shape=(input_dim,)),
    keras.layers.Dense(128, activation="relu"),
    keras.layers.Dense(64, activation="relu"),
    keras.layers.Dense(len(model.classes_), activation="softmax")
])

keras_model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
keras_model.save("svm_model.keras")
