// import DynamicWebPrediction from "./Components/DynamicWebPrediction/DynamicWebPrediction";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DynamicGuidePage from "./Components/DynamicGuide/DynamicGuidePage";
import DynamicPrediction from "./Components/DynamicWebPrediction/DynamicWebPrediction";
import GuideSelectionPage from "./Components/GuidanceSelection/GuidanceSelectionPage";
import LandingPage from "./Components/LandingPage/LandingPage";
import StaticGuidePage from "./Components/StaticGuide/StaticGuidePage";
import StaticPrediction from "./Components/StaticPrediction/StaticPrediction";
// import VideoGuidePage from "./Components/VideoGuidance/VideoGuidance"

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
          {/* <Route path="/video-guidance" element={<VideoGuidePage />} /> */}
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/staticPrediction" element={<StaticPrediction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
