import {Route, BrowserRouter as Router} from "react-router-dom";
import {landingPage} from "./pages/landingPage.js";
import {sortingPage} from "./pages/sortingPage.js";
import {graphPage} from "./pages/graphPage.js";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={landingPage}/>
      <Route path="/sorting" component={sortingPage}/>
      <Route path="/graph" component={graphPage}/>
    </Router>
  );
}

export default App;
