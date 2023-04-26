import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import classes from "./Data.module.css";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Data = ({uid}) => {
   
  const [userData, setUserData] = useState([]);
  
  
  const fetchPost = async () => {
      await getDocs(collection(db, "events")).then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setUserData(newData);
            console.log(userData, newData);
        });
    };
    
    useEffect(() => {
        fetchPost();
    }, []);
    
    const filteredUserData = userData.filter((user) => user.uid === uid);
    const length = filteredUserData.length;
    
    if(length === 0){
      return(
        <h5 className={classes.length}>No Events Found</h5>
      );
    }
   
  return (
    <React.Fragment>
     <div className={classes.event}>
      <h3>Total Events: {length}</h3>
    </div>
    <div>
      {filteredUserData.map((user) => (
        <div>
          <div className={classes.data} key={user.id}>
            <div>
              <h5> {user.eventName}</h5>
              <h4>
                {user.eventDate.toDate().toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h4>
            </div>
            <FontAwesomeIcon className={classes.icon} icon={faCircleChevronRight} />
          </div>
        </div>
      ))}
    </div>
    
    </React.Fragment>
  );
};

export default Data;
