import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./DynamicWebPrediction.css";

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
    <div className="dynamic-container">

      <h2 className="heading">Dynamic Gestures Prediction</h2>

      <div className="contentDiv">
        <div className="webCamDiv">
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="webcam"/>
        </div>

        <div className="resultDiv">
          
          <div>
            <h3>Result:</h3>
            <p className="result">{prediction}</p>
          </div>

          <button onClick={() => setCapturing(!capturing)}>
            {capturing ? "Stop Capturing" : "Start Capturing"}
          </button>
        </div>
        
      </div>
  
    </div>
  );
};

export default WebPrediction;
