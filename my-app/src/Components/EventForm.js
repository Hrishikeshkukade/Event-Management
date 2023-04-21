import React, { useEffect, useState } from "react";
import classes from "./EventForm.module.css";
import Input from "../UI/Input";
import Checkbox from "./Checkbox";
import Button from "../UI/Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EventForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    eventLocation: "",
    phone: "",
    eventFees: "",
    eventMeal: "",
    eventAccomodation: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      
      [name]: value,
      
    });
    console.log(event.target.value)
    setError({
      ...error,
      [name]: "",
    });
  };

  // states to handle inputs
  // const [eventName, setEventName] = useState("");
  // const [eventDescription, setEventDescription] = useState("");
  // // for event date
  // const [eventLocation, setEventLocation] = useState("");
  // const [eventFees, setEventFees] = useState("");
  // const [eventMeal, setEventMeal] = useState("");
  // const [eventAccomodation, setEventAccomodation] = useState("");

  // const [eventNameError, setEventNameError] = useState("");
  // const [eventDescriptionError, setEventDescriptionError] = useState("");
  // // for event date
  // const [selectedDateError, setSelectedDateError] = useState(new Date());
  // const [currentTimeError, setCurrentTimeError] = useState('');
  // const [eventLocation, setEventLocation] = useState("");
  // const [eventFees, setEventFees] = useState("");
  // const [eventMeal, setEventMeal] = useState("");
  // const [eventAccomodation, setEventAccomodation] = useState("");
  // Logic for current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const amPm = hours < 12 ? "AM" : "PM";
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${amPm}`;
    setCurrentTime(timeString);
  };
  useEffect(() => {
    getCurrentTime();
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let newError = {};

    if (formData.eventName === "") {
      newError.eventName = "Event name cannot be empty.";
    }

    if (formData.eventDescription=== "") {
      newError.eventDescription = "Event description cannot be empty.";
    }

    if (selectedDate === "") {
      newError.selectedDate = "Event date cannot be empty.";
    } 

    if (formData.currentTime === "") {
      newError.currentTime = "Event time cannot be empty.";
    }

    if (Object.keys(newError).length > 0) {
      // If there are errors, set the state with the new errors
      setError(newError);
    } else {
      // Submit form data
      setError({});
      // ... additional logic
    }
  };

  return (
    <div className={classes.signin}>
      <div className={classes.container}>
        <div className={classes.info}>
          <h1>Add New Event</h1>
        </div>
        <div className={classes.allinputs}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.email}>
              <h3>Event Title</h3>
              <Input
                value={formData.eventName}
                onChange={handleInputChange}
                required
                placeholder="Wedding"
                type="text"
              ></Input>
               {error.eventName && <p className={classes.error}>{error.eventName}</p>} 
            </div>
            <div className={classes.password}>
              <h3>Event Description</h3>
              <Input
                  onChange={handleInputChange}
                placeholder="Add a informative description..."
                type="text"
                  value={formData.eventDescription}
              ></Input>
              {error.eventDescription && <p className={classes.error}>{error.eventDescription}</p>} 
            </div>
            <div className={classes.password}>
              <h3>Event Date</h3>

              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="selected"
              />
              {/* <FontAwesomeIcon
                  icon={faCalendarAlt}
                 
                  className={classes.datepickericon}
                /> */}
                {error.selectedDate && <p className={classes.error}>{error.selectedDate}</p>} 
            </div>
            <div className={classes.password}>
              <h3>Event Time</h3>
              <Input selected={currentTime} onChange ={(e) => {setCurrentTime(e.target.value)}} placeholder="hh:mm" type="time"></Input>
              {error.currentTime && <p className={classes.error}>{error.currentTime}</p>} 
            </div>
            <div className={classes.password}>
              <h3>Event Location</h3>
              <Input
                  onChange={handleInputChange}
                placeholder=""
                type="text"
                  value={formData.eventLocation}
              ></Input>
              {error.eventLocation && <p className={classes.error}>{error.eventLocation}</p>} 
            </div>
           
            <div className={classes.password}>
              <h3>Event Fees</h3>
              <Input
                  onChange={handleInputChange}
                placeholder="Enter fees in ruppes.."
                type="text"
                  value={formData.eventFees}
              ></Input>
              {error.eventFees && <p className={classes.error}>{error.eventFees}</p>} 
            </div>
            <Checkbox onChange={handleInputChange} value={formData.eventMeal}>Meal provided by organiser?</Checkbox>
            <Checkbox onChange={handleInputChange} value={formData.eventAccomodation}>Accomodation provided by organiser?</Checkbox>
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
