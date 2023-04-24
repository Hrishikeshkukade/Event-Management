import React from "react";
import Header from "../UI/Header";
import classes from "./Settings.module.css";
// import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Settings = () => {
    const auth = getAuth();
    const history = useHistory();
    const signOutHandler = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            history.push("/");
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
    <React.Fragment> 
        <Header />
     <div className={classes.settings}>
        <div className={classes.profile}>
            <h2>Update Profile</h2>
        </div>
        {/* <FontAwesomeIcon className={classes.icon} icon={faCircleChevronRight}/> */}
        <div>
        </div>
            
        <div onClick={signOutHandler} className={classes.logout}>
            <h2>Log Out</h2>
        </div>
    </div>      
    </React.Fragment> 
    )
}

export default Settings;