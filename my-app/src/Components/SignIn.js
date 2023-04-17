import React, { useState } from "react";
import classes from "./SignIn.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <React.Fragment>
      <div className={classes.signin}>
        <div className={classes.container}>
          <div className={classes.info}>
            <h1>Login</h1>
            <h1>Hi, Welcome back</h1>
            <h5>You can continue to login to manage your events</h5>
          </div>
          <div className={classes.allinputs}>
            <form className={classes.form}>
              <div className={classes.email}>
                <h3>Email</h3>
                <input placeholder="abc@gmail.com" type="email"></input>
              </div>
              <div className={classes.password}>
                <h3>Password</h3>
                <input
                  placeholder="Enter a password..."
                  type={showPassword ? "text" : "password"}
                ></input>
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className={classes.icon}
                />
              </div>
              <div className={classes.text}>
                <Link className={classes.link} to="/fp">
                  <h6>Forgot Password</h6>
                </Link>
              </div>
            </form>

            <div>
              <button className={classes.button}>Sign-in</button>
            </div>
            <div className={classes.bottomtext}>
              <Link className={classes.link} to="/signup">
                <h5>
                  Don't have an account? <span>Sign Up</span>
                </h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
