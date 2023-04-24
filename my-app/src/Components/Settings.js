import React from "react";
import Header from "../UI/Header";
import classes from "./Settings.module.css";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Settings = () => {
    return(
    <React.Fragment> 
        <Header />
     <div className={classes.settings}>
        <div className={classes.profile}>
            <h2>Update Profile</h2>
        </div>
        <FontAwesomeIcon className={classes.icon} icon={faCircleChevronRight}/>
        <div>
        </div>
            
        <div className={classes.logout}>
            <h2>Log Out</h2>
        </div>
    </div>      
    </React.Fragment> 
    )
}

export default Settings;