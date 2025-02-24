import { Link } from "react-router-dom";
import "./Styles.css"; // Use the same CSS file for consistency

// Assuming your videos are stored in the `videos` folder
const videos = [
  { name: "Hello", src: "./videos/hello.mp4" },
  { name: "Yes", src: "./videos/yes.mp4" },
  { name: "No", src: "./videos/no.mp4" },
  { name: "Please", src: "./videos/please.mp4" },
  { name: "Thank You", src: "./videos/thankyou.mp4" },
];

function VideoGuidePage() {
  return (
    <div className="container">
      <h2 className="textDes">Video Guide (Video Tutorials)</h2>
      <div className="GridContainer">
        {videos.map((video, index) => (
          <div key={index} className="imageContainer">
            {/* Use the <video> tag to display videos */}
            <video controls className="Image">
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