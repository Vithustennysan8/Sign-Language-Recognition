import { Link } from "react-router-dom";
import "./VideoGuidance.css";

import Hello from "./video/hello.mp4";
import yes from "./video/hello.mp4";
import no from "./video/hello.mp4";
import please from "./video/hello.mp4";
// import ThankYou from "./video/hello.mp4";


const videos = [
  { name: "Hello", src: Hello },
  { name: "Yes", src: yes },
  { name: "No", src: no },
  { name: "Please", src: please },
//   { name: "Thankyou", src: Thankyou },

];

function VideoGuidePage() {
  return (
    <div className="container">
      <h2 className="textDes">Video Guide (Video Tutorials)</h2>
      <div className="GridContainer">
        {videos.map((video, index) => (
          <div key={index} className="imageContainer">
            {/* Use the <video> tag to display videos */}
            <video controls className="Image" autoPlay muted>
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3 className="textDes">{video.name}</h3>
          </div>
        ))}
      </div>
      <br />
      <div className="BLText">
        <Link to="/guide-selection" className="BackLink">
          ⬅ Back to Guide Selection
        </Link>
      </div>
    </div>
  );
}

export default VideoGuidePage;
