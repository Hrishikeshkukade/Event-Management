import React, { useEffect, useState } from "react";
import classes from "./EventForm.module.css";
import Input from "../UI/Input";
import Checkbox from "./Checkbox";
import Button from "../UI/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc, doc } from "firebase/firestore"; 
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EventForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState("");
  // states to handle inputs
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  // for event date
  const [eventLocation, setEventLocation] = useState("");
  const [eventFees, setEventFees] = useState("");
  const [eventMeal, setEventMeal] = useState("");
  const [eventAccomodation, setEventAccomodation] = useState("");
  // for validation
  const [eventNameError, setEventNameError] = useState("");
  const [eventDescriptionError, setEventDescriptionError] = useState("");
  const [eventLocationError, setEventLocationError] = useState("");
  
  const [url, setUrl] = useState("");
  const eventNameChangeHandler = (e) => {
    setEventName(e.target.value);
  }
  const eventDescriptionChangeHandler = (e) => {
    setEventDescription(e.target.value);
  }
  const eventLocationChangeHandler = (e) => {
    setEventLocation(e.target.value);
  }
  const eventFeesChangeHandler = (e) => {
    setEventFees(e.target.value);
  }
  const eventMealChangeHandler = (e) => {
    setEventMeal(e.target.value);
  }
  const eventAccomodationChangeHandler = (e) => {
    setEventAccomodation(e.target.value);
  }
  
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

  useEffect(() => {
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
  },[])// Empty dependency array to ensure the effect runs only once on component mount



  // To handle submission of form
   const  handleSubmit = (event) => {
    event.preventDefault();
   

    if (eventName.trim() === "") {
       setEventNameError("Event name cannot be empty.");
    }else{
      setEventNameError("");
    }

    if (eventDescription.trim() === "") {
      setEventDescriptionError("Event Description cannot be empty.");
    }else{
      setEventDescriptionError("");
    }

    if (eventLocation.trim() === "") {
      setEventLocationError("Event location cannot be empty.");
    }else{
      setEventLocationError("");
    }
    try{
     const docRef =  addDoc(collection(db, "events"), {
      uid: url,
      eventName: eventName,
      eventDescription: eventDescription,
      eventDate: selectedDate,
      eventTime: currentTime,
      eventLoaction: eventLocation,
      eventFees: eventFees,
      eventMeal: eventMeal,
      eventAccomodation:eventAccomodation,
    })
    console.log(docRef.id);
  }catch(err){
      console.log(err);
    }
    
    
    setEventName("");
    setEventDescription("");
    setEventLocation("");
    setEventFees("");
  }
  // .catch((err) => {
  //   alert(err.message);
  // });

    // if (Object.keys(newError).length > 0) {
    //   // If there are errors, set the state with the new errors
    //   setError(newError);
    // } else {
    //   // Submit form data
    //   setError({});
    //   // ... additional logic
    // }
   
  

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
                value={eventName}
                onChange={eventNameChangeHandler}
                required
                placeholder="Wedding"
                type="text"
              ></Input>
               {eventNameError && <p className={classes.error}>{eventNameError}</p>} 
            </div>
            <div className={classes.password}>
              <h3>Event Description</h3>
              <Input
                  onChange={eventDescriptionChangeHandler}
                placeholder="Add a informative description..."
                type="text"
                  value={eventDescription}
              ></Input>
              {eventDescriptionError && <p className={classes.error}>{eventDescriptionError}</p>} 
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
               
            </div>
            <div className={classes.password}>
              <h3>Event Time</h3>
              <Input selected={currentTime} onChange ={(e) => {setCurrentTime(e.target.value)}} placeholder="hh:mm" type="time"></Input>
             
            </div>
            <div className={classes.password}>
              <h3>Event Location</h3>
              <Input
                  onChange={eventLocationChangeHandler}
                placeholder=""
                type="text"
                  value={eventLocation}
              ></Input>
              {eventLocationError && <p className={classes.error}>{eventLocationError}</p>} 
            </div>
           
            <div className={classes.password}>
              <h3>Event Fees</h3>
              <Input
                  onChange={eventFeesChangeHandler}
                placeholder="Enter fees in ruppes.."
                type="text"
                  value={eventFees}
              ></Input>
              
            </div>
            <Checkbox onChange={eventMealChangeHandler} value={eventMeal}>Meal provided by organiser?</Checkbox>
            <Checkbox onChange={eventAccomodationChangeHandler} value={eventAccomodation}>Accomodation provided by organiser?</Checkbox>
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
