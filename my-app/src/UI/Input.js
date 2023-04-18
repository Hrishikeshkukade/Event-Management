import React from "react";
import classes from "./Input.module.css";
const Input = (props) => {
  return (
    <div className={classes.input}>
      
      <input onChange={props.onChange} value={props.value} placeholder={props.placeholder} type={props.type}></input>
    </div>
  );
};

export default Input;
