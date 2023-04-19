import React from "react";
import { useState, useEffect } from "react";
import classes from "./UserProfile.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "../UI/Header";
import { storage } from "../firebase";


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
  const handleChange = (event) => {
    const imageFile = event.target.files[0];
    setImage(imageFile);
  };
  const handleUpload = () => {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`profilePictures/${image.name}`);
    const uploadTask = imageRef.put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle progress if needed
        console.log(snapshot);
      },
      (error) => {
        // Handle error if any
        console.error(error);
      },
      () => {
        // Handle success
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // Use downloadURL to update user's profile picture
          console.log('Profile picture URL:', downloadURL);
          // Add your logic here to update user's profile picture URL in your database or anywhere else
        });
      }
    );
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if(user){
  //       setUserName(user.displayName);
  //     }else setUserName("");
  //   })
  // })
   }
  
  return (
    <div>
    <Header />
    <div className={classes.info}>
      <h4>Hello</h4>
      <h1>{userName}</h1>
      
    </div>
    
      <div>
      <h2>Update Profile Picture</h2>
      <input onChange={handleChange} type="file"  />
      <button onClick={handleUpload}>Upload</button>
    </div>
    </div>
  );
};

export default UserProfile;
