import "./App.css";
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import UsersList from "./components/UsersList";
import Header from "./components/includes/Header";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import UserDetails from "./components/UserDetails";
import EditUser from "./components/EditUser";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users-list" component={UsersList} />
          <Route exact path="/add-user" component={AddUser} />
          <Route exact path="/user/:id" component={UserDetails} />
          <Route exact path="/edit-user/:id" component={EditUser} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
