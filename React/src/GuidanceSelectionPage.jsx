// import { Link } from "react-router-dom";

// function GuideSelectionPage() {
//   return (
//     <div>
//       <h2> Choose Your Guide Type</h2>
//       <Link to="/guide-static">
//         <button style={{ padding: "10px", margin: "10px", fontSize: "18px" }}>
//           Static Guide (Images)
//         </button>
//       </Link>
//       <Link to="/guide-dynamic">
//         <button style={{ padding: "10px", margin: "10px", fontSize: "18px" }}>
//           🎥 Dynamic Guide (Videos)
//         </button>
//       </Link>
//       <br />
//       <Link
//         to="/"
//         style={{ fontSize: "18px", color: "blue", textDecoration: "underline" }}
//       >
//         ⬅ Back to Home
//       </Link>
//     </div>
//   );
// }

// export default GuideSelectionPage;

import { Link } from "react-router-dom";
import "./Styles.css";
function GuideSelectionPage() {
  return (
    //   <div>
    //     <h2> Choose Your Guide Type</h2>
    //     <Link to="/static-guidance">
    //       <button style={{ padding: "10px", margin: "10px", fontSize: "18px" }}>
    //         📷 Static Guide (gestures)
    //       </button>
    //     </Link>
    //     <Link to="/dynamic-guidance">
    //       <button style={{ padding: "10px", margin: "10px", fontSize: "18px" }}>
    //         🎥 Dynamic Guide (alphabet)
    //       </button>
    //     </Link>
    //     <Link to="/video-guidance">
    //       <button style={{ padding: "10px", margin: "10px", fontSize: "18px" }}>
    //         📹 Video Guide (Webcam)
    //       </button>
    //     </Link>
    //     <br />
    //     <Link
    //       to="/"
    //       style={{ fontSize: "18px", color: "blue", textDecoration: "underline" }}
    //     >
    //       ⬅ Back to Home
    //     </Link>
    //   </div>
    // );
    <div className="guide-container">
      {/* {" "} */}
      {/* Apply CSS class */}
      <h2> Choose Your Guide Type</h2>
      <Link to="/static-guidance">
        <button className="guide-button"> Static Guide (gestures)</button>
      </Link>
      <Link to="/dynamic-guidance">
        <button className="guide-button"> Dynamic Guide (alphabet)</button>
      </Link>
      <Link to="/video-guidance">
        <button className="guide-button">Video Guide (Webcam)</button>
      </Link>
      <br />
      <Link to="/" className="back-link">
        ⬅ Back to Home
      </Link>
    </div>
  );
}

export default GuideSelectionPage;

