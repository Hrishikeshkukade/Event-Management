import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import UserProfile from "./Components/UserProfile";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ForgotPassword from "./Components/ForgotPassword";
import Settings from "./Components/Settings";


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
          <Route path="/profile">
            <UserProfile />  
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;



