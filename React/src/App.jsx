// import DynamicWebPrediction from "./Components/DynamicWebPrediction/DynamicWebPrediction";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DynamicGuidePage from "./Components/DynamicGuide/DynamicGuidePage";
import DynamicTrain from "./Components/DynamicTrain/DynamicTrain";
import GuideSelectionPage from "./Components/GuidanceSelection/GuidanceSelectionPage";
import LandingPage from "./Components/LandingPage/LandingPage";
import StaticGuidePage from "./Components/StaticGuide/StaticGuidePage";
import StaticTrain from "./Components/StaticTrain/StaticTrain";
// import VideoGuidePage from "./VideoGuidance";
import WebPrediction from "./WebPrediction";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", padding: "20px" }}>
        {/* <h1>🖐️ Sign Language Detection</h1> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/webPrediction" element={<WebPrediction />} />
          <Route path="/guide-selection" element={<GuideSelectionPage />} />
          <Route path="/static-guidance" element={<StaticGuidePage />} />
          <Route path="/dynamic-guidance" element={<DynamicGuidePage />} />
          {/* <Route path="/video-guidance" element={<VideoGuidePage />} /> */}
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/static-train" element={<StaticTrain />} />
          <Route path="/dynamic-train" element={<DynamicTrain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
