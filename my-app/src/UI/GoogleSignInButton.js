import React, { useEffect, useState } from "react";

import { getAuth,signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./GoogleSignInButton.module.css"
const GoogleSignInButton = () => {
  const [url, setUrl] = useState(""); 
  const history = useHistory();
    const auth = getAuth();
    
    
    useEffect(() => {
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
    })
  
  
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const signinHandler = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          history.push(`/profile/${url}`)
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData ? error.customData.email:null;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
      
  

    }

  return (
    <button onClick={signinHandler} className={classes.button}>
      <img 
      src="/public/Google Signin"
      alt="G"
      />
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;