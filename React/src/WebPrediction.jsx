import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebPrediction = () => {
  const webcamRef = useRef(null);
  const [prediction, setPrediction] = useState("Waiting...");
  const [capturing, setCapturing] = useState(true);

  const captureAndSendImage = async () => {
    if (!capturing) return;
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      try {
        const response = await axios.post("http://127.0.0.1:5000/predict", {
          image: imageSrc.split(",")[1], // Remove base64 prefix
        });

        if (response.data.prediction) {
          setPrediction(response.data.prediction);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(captureAndSendImage, 100); // Capture every 100ms (10 FPS)
    return () => clearInterval(interval);
  }, [capturing]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Sign Language Prediction</h2>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        // mirrored={true}
        style={{ width: "500px", height: "400px", borderRadius: "10px" }}
      />
      <h3>Prediction: {prediction}</h3>
      <button onClick={() => setCapturing(!capturing)}>
        {capturing ? "Stop Capturing" : "Start Capturing"}
      </button>
    </div>
  );
};

export default WebPrediction;
