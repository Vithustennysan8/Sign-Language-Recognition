import { Link } from "react-router-dom";
import "./DynamicTrain.css";
const DynamicTrain = () => {
  return (
    <div>
      <h1>dynamic train</h1>

      <Link to="/landing-page" className="BackLink">
        <p style={{ color: "#222" }}>⬅ Back to LandPage</p>
      </Link>
    </div>
  );
};

export default DynamicTrain;
