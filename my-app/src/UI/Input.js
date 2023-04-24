import React from "react";
import classes from "./Input.module.css";
const Input = (props) => {
  return (
    <div className={classes.input}>
      
      <input id={props.id} onChange={props.onChange} value={props.value} placeholder={props.placeholder} type={props.type} required></input>
    </div>
  );
};

export default Input;
