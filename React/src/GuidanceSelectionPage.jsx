// import { Link } from "react-router-dom";
// import "./css/GuidanceSelectionPage.css";

// function GuideSelectionPage() {
//   return (
//     <div className="guide-container">
//       {/* {" "} */}
//       {/* Apply CSS class */}
//       <h2> Choose Your Guide Type</h2>
//       <Link to="/static-guidance">
//         <button className="guide-button"> Static Guide (ALPHABET)</button>
//       </Link>
//       <Link to="/dynamic-guidance">
//         <button className="guide-button"> Dynamic Guide (GESTURES)</button>
//       </Link>
//       <Link to="/video-guidance">
//         <button className="guide-button">Video Guide (GESTURES)</button>
//       </Link>
//       <br />
//       {/* <Link to="/" className="back-link">
//         ⬅ Back to Home
//       </Link> */}
//       <div className="BLText">
//         <Link to="/landing-page" className="BackLink">
//           ⬅ Back to LandPage
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default GuideSelectionPage;

//card
import "./css/GuidanceSelectionPage.css";
import { Link } from "react-router-dom";

const ButtonStates = () => {
  return (
    <div className="container">
      <div className="button-states">
        <h1>Guidence</h1>
        <div className="cards-container">
          {/* Card for Static */}
          <Link to="/static-guidance" className="card focus">
            <div>
              <h2>STATIC (GESTURES)</h2>
            </div>
          </Link>

          {/* Card for Dynamic */}
          <Link to="/dynamic-guidance" className="card focus">
            <div>
              <h2>DYNAMIC (ALPHABETS)</h2>
            </div>
          </Link>

          {/* Card for Video */}
          <Link to="/video-guidance" className="card focus">
            <div>
              <h2>VIDEOS</h2>
            </div>
          </Link>
        </div>

        {/* Back to Home Link */}
        <Link to="/landing-page" className="back-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ButtonStates;