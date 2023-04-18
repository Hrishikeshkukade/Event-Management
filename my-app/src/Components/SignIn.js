import React, { useState } from "react";
import classes from "./SignIn.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../UI/Button";
import Input from "../UI/Input";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const isValidEmail = (email) => {
    // Simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation here
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Please enter an email";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Please enter a password";
    }

    // Set the new validation errors to state
    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      // Perform form submission here
      console.log("Form submitted successfully!");
    }
    console.log("clicked");
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
            <form  onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.email}>
                <h3>Email</h3>
                <Input
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="abc@gmail.com"
                  type="email"
                ></Input>
                {errors.email && <span className={classes.error}>{errors.email}</span>}
              </div>
              <div className={classes.password}>
                <h3>Password</h3>
                <Input
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter a password..."
                  type={showPassword ? "text" : "password"}
                ></Input>
                {errors.password && (
                  <span className={classes.error}>{errors.password}</span>
                )}
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
