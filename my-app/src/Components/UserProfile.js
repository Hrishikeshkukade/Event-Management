import React from "react";
import { useState, useEffect } from "react";
import classes from "./UserProfile.module.css";
import {  getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import Header from "../UI/Header";
import { storage } from "../firebase";
import { FirebaseApp } from "firebase/app";


const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(null);

  

  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const displayName = user.displayName;
        setUserName(displayName);
      } else {
        // User is signed out
        // ...
      }
    });
  });
  async function handleFileInputChange  (e)  {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const file = e.target.files[0];
      const storageRef = storage().ref();
      const fileRef = storageRef.child(`profile_images/${file.name}`);
      await fileRef.put(file);
      const downloadURL = await fileRef.getDownloadURL();
      // You can now use the downloadURL to store the profile image URL in your database or use it in your UI
      console.log('File uploaded successfully:', downloadURL);
    }
  }
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if(user){
  //       setUserName(user.displayName);
  //     }else setUserName("");
  //   })
  // })
  
  
  return (
    <div>
    <Header />
    <div className={classes.info}>
      <h4>Hello</h4>
      <h1>{userName}</h1>
      
    </div>
    
      <div className={classes.profile}>
       
       <input onChange={handleFileInputChange} type="file"  />
       <button>Upload</button> 
    </div>
    </div>
  );
};

export default UserProfile;
