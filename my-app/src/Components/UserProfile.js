import React from "react";
import { useState, useEffect } from "react";
import classes from "./UserProfile.module.css";
import {  getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "../UI/Header";
import Button from "../UI/Button";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import { auth } from "../firebase";

// import { getStorage } from "firebase/storage";
// import { upload } from "../firebase";
const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const [url, setUrl] = useState("");
  
  // const [image, setImage] = useState(null);
  // const [photoUrl, setPhotoUrl] = useState();
  
  // const storage = getStorage();
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const displayName = user.displayName;
        const uid = user.uid
        setUserName(displayName);
        setUrl(uid)
        // setPhotoUrl(user.photoURL);
      } else {
        // User is signed out
        // ...
      }
    });
  });
  // const handleFileInputChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // }
  // const handleUpload = async () => {
  //   // if (image) {
  //   //   const storageRef = storage().ref();
  //   //   const fileRef = storageRef.child(`profile_images/${image.name}`);
  //   //   await fileRef.put(image);
  //   //   const downloadURL = await fileRef.getDownloadURL();
  //   //   // You can now use the downloadURL to store the profile image URL in your database or use it in your UI
  //   //   console.log('File uploaded successfully:', downloadURL);
  //   // }
  //   upload(image, auth)
  // }
  // async function handleFileInputChange  (e)  {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //     const file = e.target.files[0];
  //     const storageRef = storage().ref();
  //     const fileRef = storageRef.child(`profile_images/${file.name}`);
  //     await fileRef.put(file);
  //     const downloadURL = await fileRef.getDownloadURL();
  //     // You can now use the downloadURL to store the profile image URL in your database or use it in your UI
  //     console.log('File uploaded successfully:', downloadURL);
  //   }
  // }
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
    
    <div>
      <NavLink to={`/${url}/events`} activeClassName = {classes.active}>
        <Button  className={classes.button}>Add Events</Button>
      </NavLink>
    </div>
      {/* <div className={classes.profile}>
       
       <input type="file"  onChange={handleFileInputChange}  />
       <button onClick={handleUpload}>Upload</button> 
       <img  src={photoUrl} alt="noimage"></img>
    </div> */}
    </div>
  );
};

export default UserProfile;