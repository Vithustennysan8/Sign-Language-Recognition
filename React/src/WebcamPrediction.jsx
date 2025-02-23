import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mpHolistic from "@mediapipe/holistic";
import Webcam from "react-webcam";

const actions = ["Hello", "Yes", "No", "Please", "ThankYou"]; // Same as training

const WebcamPrediction = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState("Waiting...");

  // Load TensorFlow.js model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel("/lstm_sign_language_model_2");
        setModel(loadedModel);
        console.log("✅ Model loaded successfully!");
      } catch (error) {
        console.error("Error loading model:", error);
        setPrediction("Error loading model");
      }
    };
    loadModel();
  }, []);

  // Extract keypoints using MediaPipe
  const extractKeypoints = async (results) => {
    const pose = results.poseLandmarks || Array(33).fill([0, 0, 0]);
    const leftHand = results.leftHandLandmarks || Array(21).fill([0, 0, 0]);
    const rightHand = results.rightHandLandmarks || Array(21).fill([0, 0, 0]);

    return [...pose.flat(), ...leftHand.flat(), ...rightHand.flat()];
  };

  // Run Predictions
  const runPrediction = async () => {
    if (model && webcamRef.current) {
      const video = webcamRef.current.video;
      const holistic = new mpHolistic.Holistic({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
      });

      holistic.onResults(async (results) => {
        const keypoints = await extractKeypoints(results);
        const inputTensor = tf.tensor([keypoints]);

        // Get prediction
        const predictionIndex = model
          .predict(inputTensor)
          .argMax(1)
          .dataSync()[0];
        setPrediction(actions[predictionIndex]);
      });

      const processFrame = async () => {
        if (!video.paused && !video.ended) {
          await holistic.send({ image: video });
          requestAnimationFrame(processFrame);
        }
      };

      processFrame();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Live Sign Language Recognition</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Webcam
          ref={webcamRef}
          style={{ width: "640px", height: "480px" }}
          mirrored
        />
      </div>
      <button onClick={runPrediction}>Start Recognition</button>
      <h3>Prediction: {prediction}</h3>
    </div>
  );
};

export default WebcamPrediction;
