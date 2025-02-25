import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mpHolistic from "@mediapipe/holistic";
import Webcam from "react-webcam";
import axios from "axios";

const actions = ["Hello", "Yes", "No", "Please", "ThankYou", "Friend", "Help", "Goodbye"];

const WebcamPrediction = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [wordPrediction, setWordPrediction] = useState("Waiting...");
  const [letterPrediction, setLetterPrediction] = useState("Waiting...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel("/lstm_sign_language_model_2");
        setModel(loadedModel);
        console.log("✅ Model loaded successfully!");
      } catch (error) {
        console.error("Error loading model:", error);
        setWordPrediction("Error loading model");
      }
    };
    loadModel();
  }, []);

  const extractKeypoints = async (results) => {
    const pose = results.poseLandmarks || Array(33).fill([0, 0, 0]);
    const leftHand = results.leftHandLandmarks || Array(21).fill([0, 0, 0]);
    const rightHand = results.rightHandLandmarks || Array(21).fill([0, 0, 0]);
    return [...pose.flat(), ...leftHand.flat(), ...rightHand.flat()];
  };

  const runPrediction = async () => {
    if (model && webcamRef.current) {
      const video = webcamRef.current.video;
      const holistic = new mpHolistic.Holistic({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
      });
      holistic.onResults(async (results) => {
        setLoading(true);
        const keypoints = await extractKeypoints(results);
        const inputTensor = tf.tensor([keypoints]);
        const predictionIndex = model.predict(inputTensor).argMax(1).dataSync()[0];
        setWordPrediction(actions[predictionIndex]);
        setLoading(false);

        try {
          const response = await axios.post("http://127.0.0.1:5000/predict", {
            image: webcamRef.current.getScreenshot().split(",")[1],
          });
          if (response.data.letter_prediction) {
            setLetterPrediction(response.data.letter_prediction);
          }
        } catch (error) {
          console.error("Error:", error);
        }
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
      <Webcam ref={webcamRef} style={{ width: "640px", height: "480px" }} mirrored />
      <button onClick={runPrediction}>Start Recognition</button>
      {loading && <p>Processing...</p>}
      <h3>Word Prediction: {wordPrediction}</h3>
      <h3>Letter Prediction: {letterPrediction}</h3>
    </div>
  );
};

export default WebcamPrediction;
