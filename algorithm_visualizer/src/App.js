import {Route, BrowserRouter as Router} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage.js";
import {SortingPage} from "./pages/SortingPage.js";
import {GraphPage} from "./pages/GraphPage.js";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={LandingPage}/>
      <Route path="/sorting" component={SortingPage}/>
      <Route path="/graph" component={GraphPage}/>
    </Router>
  );
}

export default App;
