import WebPrediction from './Components/DynamicWebPrediction/DynamicWebPrediction'

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DynamicGuidePage from "./DynamicGuidePage";
import GuideSelectionPage from "./GuideSelectionPage";
import StaticGuidePage from "./StaticGuidePage";
import VideoGuidePage from "./VideoGuidePage"; // Import the VideoGuidePage

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>🖐️ Sign Language Detection</h1>
        <Routes>
          <Route path="/" element={<WebPrediction />} />
          <Route path="/guide-selection" element={<GuideSelectionPage />} />
          <Route path="/static-guidance" element={<StaticGuidePage />} />
          <Route path="/dynamic-guidance" element={<DynamicGuidePage />} />
          <Route path="/video-guidance" element={<VideoGuidePage />} /> {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;