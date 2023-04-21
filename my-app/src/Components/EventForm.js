import React, {useState} from "react";
import classes from "./EventForm.module.css";
import Input from "../UI/Input";
import Checkbox from "./Checkbox";
import Button from "../UI/Button";


const EventForm = () => {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const [date, setDate] = useState(today)
 

  const dateChangeHandler = (e) => {
    setDate(e.target.value);
    console.log(e.target.value);
  }
  
  console.log(today);
  return (
    <div className={classes.signin}>
      <div className={classes.container}>
        <div className={classes.info}>
          <h1>Add New Event</h1>
        </div>
        <div className={classes.allinputs}>
          <form className={classes.form}>
            <div className={classes.email}>
              <h3>Event Title</h3>
              <Input
                required
                //   onChange={emailChangeHandler}
                placeholder="Wedding"
                type="text"
                //   value={email}
              ></Input>
              {/* {emailError && <p className={classes.error}>{emailError}</p>} */}
            </div>
            <div className={classes.password}>
              <h3>Event Description</h3>
              <Input
                //   onChange={passwordChangeHandler}
                placeholder="Add a informative description..."
                type="text"
                //   value={password}
              ></Input>
            </div>
            <div className={classes.password}>
              <h3>Event Date</h3>
              <Input
                onChange={dateChangeHandler}
                placeholder=""
                type="date"
                 defaultValue={today}
                value={date}
              >
          
             </Input>
            </div>
            <div className={classes.password}>
              <h3>Event Time</h3>
              <Input
                //   onChange={passwordChangeHandler}
                placeholder=""
                type="time"
                //   value={password}
              ></Input>
            </div>
            <div className={classes.password}>
              <h3>Event Location</h3>
              <Input
                //   onChange={passwordChangeHandler}
                placeholder=""
                type="text"
                //   value={password}
              ></Input>
            </div>
            <div className={classes.password}>
              <h3>Event Description</h3>
              <Input
                //   onChange={passwordChangeHandler}
                placeholder="Add a informative description..."
                type="text"
                //   value={password}
              ></Input>
            </div>
            <div className={classes.password}>
              <h3>Event Fees</h3>
              <Input
                //   onChange={passwordChangeHandler}
                placeholder="Enter fees in ruppes.."
                type="text"
                //   value={password}
              ></Input>
            </div>
            <Checkbox>Meal provided by organiser?</Checkbox>
            <Checkbox>Accomodation provided by organiser?</Checkbox>
            <div className={classes.button}>
              <Button>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
