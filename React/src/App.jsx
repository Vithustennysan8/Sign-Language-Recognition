import WebPrediction from './Components/DynamicWebPrediction/DynamicWebPrediction'

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DynamicGuidePage from "./DynamicGuidePage";
import StaticGuidePage from "./StaticGuidePage";
import VideoGuidePage from "./VideoGuidance";
import GuideSelectionPage from './GuidanceSelectionPage';

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>🖐️ Sign Language Detection</h1>
        <Routes>
          <Route path="/webPrediction" element={<WebPrediction />} />
          <Route path="/" element={<GuideSelectionPage/>} />
          <Route path="/static-guidance" element={<StaticGuidePage />} />
          <Route path="/dynamic-guidance" element={<DynamicGuidePage />} />
          <Route path="/video-guidance" element={<VideoGuidePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;