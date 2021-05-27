import Home from "./components/Home";
import Header from './components/includes/Header'
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
