import React from "react";
import classes from "./ForgotPassword.module.css";
const ForgotPassword = () => {
  return (
    <div className={classes.signin}>
      <div className={classes.container}>
        <div className={classes.info}>
          <h1>Forgot Password</h1>
          <h5>Enter your registered email below to recieve password reset email</h5>
        </div>
        <div className={classes.allinputs}>
          <form className={classes.form}>
            <div className={classes.email}>
              <h3>Email</h3>
              <input placeholder="abc@gmail.com" type="email"></input>
            </div>
            <div>
              <button className={classes.button}>Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
