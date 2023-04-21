import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import UserProfile from "./Components/UserProfile";
import EventForm from "./Components/EventForm";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ForgotPassword from "./Components/ForgotPassword";
import Settings from "./Components/Settings";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
     
      const uid = user.uid
      
      setUrl(uid)
      // setPhotoUrl(user.photoURL);
    } else {
      // User is signed out
      // ...
    }
  });
 
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
          <Route path={`/${url}/events`}>
            <EventForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;



