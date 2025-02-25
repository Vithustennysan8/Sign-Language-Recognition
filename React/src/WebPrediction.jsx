import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebPrediction = () => {
  const webcamRef = useRef(null);
  const [wordPrediction, setWordPrediction] = useState("Waiting...");
  const [letterPrediction, setLetterPrediction] = useState("Waiting...");
  const [capturing, setCapturing] = useState(true);
  const [loading, setLoading] = useState(false);

  const captureAndSendImage = async () => {
    if (!capturing || !webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        image: imageSrc.split(",")[1], // Remove base64 prefix
      });

      if (response.data.word_prediction) {
        setWordPrediction(response.data.word_prediction);
      }
      if (response.data.letter_prediction) {
        setLetterPrediction(response.data.letter_prediction);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(captureAndSendImage, 200); // Reduced request rate to avoid overload
    return () => clearInterval(interval);
  }, [capturing]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Sign Language Prediction</h2>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" style={{ width: "500px", height: "400px", borderRadius: "10px" }} />
      <h3>Word Prediction: {wordPrediction}</h3>
      <h3>Letter Prediction: {letterPrediction}</h3>
      {loading && <p>Processing...</p>}
      <button onClick={() => setCapturing(!capturing)}>
        {capturing ? "Stop Capturing" : "Start Capturing"}
      </button>
    </div>
  );
};

export default WebPrediction;
