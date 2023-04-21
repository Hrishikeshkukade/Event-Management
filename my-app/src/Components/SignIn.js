import React, {  useState } from "react";
import classes from "./SignIn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../UI/Button";
import Input from "../UI/Input"; 
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [url, setUrl] = useState(""); 
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const history = useHistory();

 
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    
  }


  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  }
  // const isValidEmail = (email) => {
  //   // Simple email validation using regular expression
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setEmailError("Please enter an email.");
    }
    if (password.trim() === "") {
      setPasswordError("Please enter a password.");
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
       
        console.log(user);
        history.push(`/profile/${url}`)
      })
      .catch((err) => {
        alert(err.message);
      });


    console.log(email, password)
    setEmail("");
    setPassword("");
   
  }


   

   
 
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
            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.email}>
                <h3>Email</h3>
                <Input
                  required
                  onChange={emailChangeHandler}
                  placeholder="abc@gmail.com"
                  type="email"
                  value={email}
                ></Input>
                {emailError && <p className={classes.error}>{emailError}</p>}
              </div>
              <div className={classes.password}>
                <h3>Password</h3>
                <Input
                  onChange={passwordChangeHandler}
                  placeholder="Enter a password..."
                  type={showPassword ? "text" : "password"}
                  value={password}
                ></Input>
                
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className={classes.icon}
                />
                 {passwordError && <p className={classes.error}>{passwordError}</p>}
              </div>
              <div className={classes.text}>
                <Link className={classes.link} to="/fp">
                  <h6>Forgot Password</h6>
                </Link>
              </div>
            <Button type="submit">Sign-In</Button>
            </form>

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
