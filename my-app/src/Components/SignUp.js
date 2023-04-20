import React, { useState } from "react";
import classes from "./SignUp.module.css";
import CheckboxWithAnimation from "./Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"; 

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const mobileNumberRegex = /^[0-9]{10}$/;
  
  const history = useHistory();
  
  const checkChangeHandler = (e) => {
    setIsChecked(e.target.checked);
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
    setNameError(""); // Resetting the name error
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Resetting the email error
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    }
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Resetting the password error
  };
  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(""); // Resetting the confirm password error
  };
  const mobileNumberChangeHandler = (e) => {
    setMobileNumber(e.target.value);
    setMobileNumberError(""); // Resetting the mobile number error
    if (!mobileNumberRegex.test(mobileNumber)) {
      setMobileNumberError("Please enter a valid mobile number.");
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  async function registerHandler(e) {
    e.preventDefault();

    if (name.trim() === "") {
      setNameError("Please enter a name.");
    }
    if (email.trim() === "") {
      setEmailError("Please enter an email.");
    }
    if (password.trim() === "") {
      setPasswordError("Please enter a password.");
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Please confirm your password.");
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Please check your password.");
    }
    if (mobileNumber.trim() === "") {
      setMobileNumberError("Please enter a mobile number.");
    }

     createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        updateProfile(user, {
          displayName: name,
          phoneNumber: mobileNumber,
          
        })
        console.log(user);
        history.push("/profile")
         const docRef =  addDoc(collection(db, "users"), {
          uid: user.uid,
          name: name,
          email: user.email,
          mobileNumber: mobileNumber,
        });
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((err) => {
        alert(err.message);
      });
    
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMobileNumber("");
  }
  return (
    <React.Fragment>
      <div className={classes.signin}>
        <div className={classes.container}>
          <div className={classes.info}>
            <h1>Setup your profile</h1>

            <h5>
              Create an account so you can create and manage all your events at
              one place
            </h5>
          </div>
          <div className={classes.allinputs}>
            <form onSubmit={registerHandler} className={classes.form}>
              <div className={classes.email}>
                <h3>Name</h3>
                <Input
                  value={name}
                  onChange={nameChangeHandler}
                  placeholder="Enter Name"
                  type="text"
                ></Input>
                {nameError && <p className={classes.error}>{nameError}</p>}
              </div>

              <div className={classes.email}>
                <h3>Email</h3>
                <Input
                  value={email}
                  onChange={emailChangeHandler}
                  placeholder="abc@gmail.com"
                  type="email"
                ></Input>
                {emailError && <p className={classes.error}>{emailError}</p>}
              </div>
              <div className={classes.password}>
                <h3>Password</h3>
                <Input
                  value={password}
                  onChange={passwordChangeHandler}
                  placeholder="Enter a password..."
                  type={showPassword ? "text" : "password"}
                ></Input>
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className={classes.icon}
                />
                {passwordError && (
                  <p className={classes.error}>{passwordError}</p>
                )}
              </div>

              <div className={classes.password}>
                <h3>Confirm Password</h3>
                <Input
                  value={confirmPassword}
                  onChange={confirmPasswordChangeHandler}
                  placeholder="Confirm the entered password..."
                  type="password"
                ></Input>
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className={classes.icon}
                />
                {confirmPasswordError && (
                  <p className={classes.error}>{confirmPasswordError}</p>
                )}
              </div>

              <div className={classes.password}>
                <h3>Mobile Number</h3>
                <Input
                  value={mobileNumber}
                  onChange={mobileNumberChangeHandler}
                  placeholder="Enter the mobile number..."
                  type="text"
                ></Input>
                {mobileNumberError && (
                  <p className={classes.error}>{mobileNumberError}</p>
                )}
              </div>

              <CheckboxWithAnimation
                isChecked={isChecked}
                onChange={checkChangeHandler}
              />

              <Button>Register</Button>
            </form>

            <div className={classes.bottomtext}>
              <Link className={classes.link} to="/">
                <h5>
                  Already have an account? <span>Sign In</span>
                </h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
