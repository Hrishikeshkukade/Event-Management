import React, {useState} from "react";
import { faGear, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Header = () => {
    const [url, setUrl] = useState("");



    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUrl(uid);
       
      } else {
        // User is signed out
        // ...
      }
    });
    const link = `/profile/${url}`;
    return(
        <header className={classes.header}>
      <div className={classes.home}>
        <NavLink to={link} activeClassName={classes.active}>
          <div>
            <FontAwesomeIcon className={classes.icon} icon={faHome} />
          </div>

          <label className={classes.label}>Home</label>
        </NavLink>
      </div>
      <div className={classes.settings}>
        <NavLink to="/settings" activeClassName={classes.active}>
        <div>
          <FontAwesomeIcon className={classes.icon} icon={faGear} />
        </div>
        <label className={classes.label}>Settings</label>
        </NavLink>
      </div>
    </header>
    );
}

export default Header;