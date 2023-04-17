import React, {useState} from "react";
import classes from "./SignUp.module.css";
import CheckboxWithAnimation from "./Checkbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SignUp = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
   

    const checkChangeHandler = (e) => {
        setIsChecked(e.target.checked);
      }
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  return (
    <React.Fragment>
      <div className={classes.signin}>
        <div className={classes.container}>
          <div className={classes.info}>
            <h1>Setup your profile</h1>
           
            <h5>Create an account so you can create and manage all your events at one place</h5>
          </div>
          <div className={classes.allinputs}>
            <form className={classes.form}>
             
                <div className={classes.email}>
                  <h3>Name</h3>
                  <input placeholder="Enter Name" type="text"></input>
                </div>
              
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
               
                <div className={classes.password}>
                  <h3>Confirm Password</h3>
                  <input
                    placeholder="Confirm the entered password..."
                    type="password"
                  ></input>
                   <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className={classes.icon}
                />
                </div>
              
             
                <div className={classes.password}>
                  <h3>Mobile Number</h3>
                  <input
                    placeholder="Enter the mobile number..."
                    type="text"
                  ></input>
                </div>
              
              
                
              
            
                <CheckboxWithAnimation
                  isChecked={isChecked}
                  onChange={checkChangeHandler}
                />
              
            </form>

            <div>
              <button className={classes.button}>
                Register
              </button>
            </div>
            <div className={classes.bottomtext}>
             <Link className={classes.link} to="/">
              <h5>
                Already have an account?{" "}
                <span>Sign In</span>
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
