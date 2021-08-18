import "./LandingPage.css";
import { useHistory } from "react-router-dom";

export const LandingPage = () => {

  const history = useHistory()

  return (
    <div className="landingPage d-flex flex-column pt-5">
        <div className="w-100 flex-grow-1 d-flex justify-content-around align-items-center flex-wrap gap-4 m-auto">
          <div onClick={() =>  history.push('/sorting')} className="algo">
            <h2 className="mb-4">Sorting Algorithms</h2>
            <img src={process.env.PUBLIC_URL + "/sorting_example.PNG"} />
          </div>

          <div onClick={() =>  history.push('/graph')} className="algo">
            <h2 className="mb-4">Graph Algorithms</h2>
            <img src={process.env.PUBLIC_URL + "/graph_example.PNG"} />
          </div>
        </div>
        <div className="mb-2 ms-2">
          <div 
            className="github-link d-inline-block" 
            onClick={() => {window.location.href="https://github.com/anish-kondepudi/AlgorithmVisualizer"}}
          > 
            <i class="fab fa-3x fa-github"></i>
          </div>
        </div>
    </div>
  );
}
