import "./LandingPage.css";
import { useHistory, Link } from "react-router-dom";

export const LandingPage = () => {

  const history = useHistory()

  return (
    <div className="landingPage d-flex align-items-center justify-content-center p-3">
      <div className="w-100 d-flex justify-content-around flex-wrap gap-4 m-auto">
          <div onClick={() =>  history.push('/sorting')} className="algo">
            <h2 className="mb-4">Sorting Algorithms</h2>
            <img src={process.env.PUBLIC_URL + "/sorting_example.PNG"} />
            
          </div>

          <div onClick={() =>  history.push('/graph')} className="algo">
            <h2 className="mb-4">Graph Algorithms</h2>
            <img src={process.env.PUBLIC_URL + "/graph_example.PNG"} />
            
          </div>
        </div>
    </div>
  );
}
