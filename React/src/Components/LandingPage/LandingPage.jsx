// import { Link } from "react-router-dom";
// import "./css/LandingPage.css";

// const LandingPage = () => {
//   return (
//     <div className="landing-page">
//       <h1> Hand Gesture Recognition</h1>
//       <div className="buttons">
//         <Link to="dynamic-train" className="BackLink">
//           <button>Dynamic train</button>
//         </Link>
//         <Link to="webPrediction" className="BackLink">
//           <button>Turn on WEB CAM</button>
//         </Link>
//         <div className="BLText">
//           <Link to="/static-train" className="BackLink">
//             <button> Static train</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Hand Gesture Recognition</h1>
      <div className="cards-container">
        {/* Card for Dynamic Train */}

        <Link to="/dynamicPrediction" className="card">
          <div className="card-content">
            <h2>Dynamic Gesture</h2>
          </div>
        </Link>

        {/* Card for Static Train */}

        <Link to="/staticPrediction" className="card">
          <div className="card-content">
            <h2>Static Gesture</h2>
          </div>
        </Link>
      </div>

      <div className="webcam-button">
        <Link to="/guide-selection" className="BackLink">
          <button>Visit Tutorial</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
