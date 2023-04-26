import React from "react";
import { useState, useEffect } from "react";
import classes from "./UserProfile.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "../UI/Header";
import Button from "../UI/Button";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Data from "./Data";
// import { getDocs,  where, query } from "firebase/firestore";
import "firebase/firestore";
// import { db } from "../firebase";
// import { collection } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";

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
        const uid = user.uid;
        setUserName(displayName);
        setUrl(uid);
        // const Firestore = getFirestore();
        // const data = collection(Firestore, "events");

        // const q = where("uid", "==", user.uid);
        // getDocs(data, q)
        //   .then((querySnapshot) => {
        //     // Get the actual data from the querySnapshot
        //     const fetchedData = querySnapshot.docs.map((doc) => doc.data());
        //     setUserData(fetchedData);
        //     console.log(fetchedData);
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching data from Firestore:", error);
        //   });

         

        // const fetchUserData = async () => {
        //   try {
        //     const uid = user.uid;
        //     const eventDoc = doc(db, "events", uid);
        //     const eventSnapshot = await getDocs(eventDoc);

        //     if (eventSnapshot.exists()) {
        //       setUserData(eventSnapshot.data());
        //     }
        //   } catch (error) {
        //     console.error("Error fetching user data:", error);
        //   }
        // };

        // // setPhotoUrl(user.photoURL);
        

        // };
      }
    });
  }, []);
//   const fetchEvents = async () => {
       
//     await getDocs(collection(db, "events"))
//         .then((querySnapshot)=>{               
//             const newData = querySnapshot.docs
//                 .map((doc) => ({...doc.data(), id:doc.uid }));
//             setUserData(newData);                
//             console.log(userData, newData);
//         })
   
// }
//   useEffect(() => {
//     fetchEvents();
//   })
  // useEffect(() => {
  //   const fetchUserData = async (userId) => {
  //     const Firestore = getFirestore();
  //     const q = query(collection(Firestore, "events"), where("uid", "==", userId));
  //     const querySnapshot = await getDocs(q);
  //     const userData = querySnapshot.docs.map((doc) => doc.data());
  //     setUserData(userData);
  //   };
  //   fetchUserData();
  // })
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
      <div className={classes.data}>
       <Data uid={url}/>
      </div>
      <div>
        <NavLink to={`/${url}/events`} activeClassName={classes.active}>
          <Button className={classes.button}>Add Events</Button>
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
