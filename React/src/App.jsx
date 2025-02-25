// import DynamicWebPrediction from "./Components/DynamicWebPrediction/DynamicWebPrediction";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DynamicGuidePage from "./DynamicGuidePage";
import GuideSelectionPage from "./GuidanceSelectionPage";
import LandingPage from "./LandingPage";
import StaticGuidePage from "./StaticGuidePage";
import StaticPrediction from "./StaticPrediction";
import VideoGuidePage from "./VideoGuidance";
import DynamicPrediction from "./Components/DynamicWebPrediction/DynamicWebPrediction";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center"}}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dynamicPrediction" element={<DynamicPrediction />} />
          <Route path="/guide-selection" element={<GuideSelectionPage />} />
          <Route path="/static-guidance" element={<StaticGuidePage />} />
          <Route path="/dynamic-guidance" element={<DynamicGuidePage />} />
          <Route path="/video-guidance" element={<VideoGuidePage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/staticPrediction" element={<StaticPrediction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
