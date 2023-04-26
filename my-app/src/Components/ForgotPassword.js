import React, { useState,  } from "react";
import classes from "./ForgotPassword.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const auth = getAuth();
  
  const changeHandler = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handleForgotPassword =  (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000"
    })
    
  .then(() => {
    // Password reset email sent!
    console.log("Password reset email sent!");
  })
  .catch((error) => {
    console.log(error);
    // ..
  });
  }

  


  const clickHandler = (e) => {
    e.preventDefault();
   
    history.push("/");
  };
  
  return (
    <div className={classes.signin}>
      <div className={classes.container}>
        <div>
          <button type="submit" onClick={clickHandler} className={classes.signinbutton}>
            Sign-In
          </button>
        </div>
        <div className={classes.info}>
          <h1>Forgot Password</h1>
          <h5>
            Enter your registered email below to recieve password reset email
          </h5>
        </div>
        <div className={classes.allinputs}>
          <form onSubmit={handleForgotPassword} className={classes.form}>
            <div className={classes.email}>
              <h3>Email</h3>
              <Input
                value={email}
                onChange={changeHandler}
                placeholder="Enter your email"
                type="email"
              ></Input>
            </div>
            
            

            <Button>Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
