// import DynamicWebPrediction from "./Components/DynamicWebPrediction/DynamicWebPrediction";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DynamicGuidePage from "./DynamicGuidePage";
import DynamicTrain from "./DynamicTrain";
import GuideSelectionPage from "./GuidanceSelectionPage";
import LandingPage from "./LandingPage";
import StaticGuidePage from "./StaticGuidePage";
import StaticTrain from "./StaticTrain";
import VideoGuidePage from "./VideoGuidance";
import WebPrediction from "./WebPrediction";
import DynamicWepPrediction from "./Components/DynamicWebPrediction/DynamicWebPrediction";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center"}}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/webPrediction" element={<DynamicWepPrediction />} />
          <Route path="/guide-selection" element={<GuideSelectionPage />} />
          <Route path="/static-guidance" element={<StaticGuidePage />} />
          <Route path="/dynamic-guidance" element={<DynamicGuidePage />} />
          <Route path="/video-guidance" element={<VideoGuidePage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/static-train" element={<StaticTrain />} />
          <Route path="/dynamic-train" element={<DynamicTrain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
