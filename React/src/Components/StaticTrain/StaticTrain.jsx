import { Link} from "react-router-dom";
import "./StaticTrain.css";

const StaticTrain = () => {
  return (
    <div>
      <h1>static train page</h1>
      <Link to="/landing-page" className="BackLink">
        <p style={{ color: "#222" }}>⬅ Back to LandPage</p>
      </Link>
    </div>
  )
}

export default StaticTrain
