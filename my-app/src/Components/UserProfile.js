import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { faGear, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./UserProfile.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const UserProfile = () => {
  const [userName, setUserName] = useState("");
  
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if(user){
  //       setUserName(user.displayName);
  //     }else setUserName("");
  //   })
  // })
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const displayName = user.displayName;
        setUserName(displayName);
      } else {
        // User is signed out
        // ...
      }
    });
  });
 
  
  return (
    <header className={classes.header}>
      <div className={classes.home}>
        <NavLink to="/profile"activeClassName={classes.active}>
          <div>
            <FontAwesomeIcon className={classes.icon} icon={faHome} />
          </div>

          <label className={classes.label}>Home</label>
        </NavLink>
      </div>
      <div className={classes.settings}>
        <div>
          <FontAwesomeIcon className={classes.icon} icon={faGear} />
        </div>
        <label className={classes.label}>Settings</label>
      </div>
    </header>
  );
};

export default UserProfile;
