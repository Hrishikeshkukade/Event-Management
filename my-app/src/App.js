import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/fp">
            <ForgotPassword />  
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;



