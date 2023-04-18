import React from "react";
import classes from "./ForgotPassword.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../UI/Button";
import Input from "../UI/Input";
const ForgotPassword = () => {
  const history = useHistory();

  const clickHandler = () => {
    history.push("/");
  }
  return (
    <div className={classes.signin}>
      <div className={classes.container}>
        <div>
          <button onClick={clickHandler} className={classes.signinbutton}>Sign-In</button>
        </div>
        <div className={classes.info}>
          <h1>Forgot Password</h1>
          <h5>Enter your registered email below to recieve password reset email</h5>
        </div>
        <div className={classes.allinputs}>
          <form className={classes.form}>
            <div className={classes.email}>
              <h3>Email</h3>
              <Input placeholder="abc@gmail.com" type="email"></Input>
            </div>
            <Button>Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
