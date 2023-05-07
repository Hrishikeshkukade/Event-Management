import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { updateDoc, doc} from 'firebase/firestore';
import { getDocs,query,collection } from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { db,storage } from '../firebase';
import 'firebase/storage';
import 'firebase/firestore';




const ProfilePicture = (props) => {
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  

//   const userEmail = email; // Replace with the user's email
// const usersCollectionRef = collection(db, 'users'); // Update the collection name with your specific data
// const querySnapshot = await getDocs(query(usersCollectionRef, 'email', '==', userEmail));
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleUpload = async() => {
    if (profilePicture) {
     if (props.user) {
        const userEmail = props.user; // Get the user's email
        // Query Firestore collection to find the specific user document based on email
        const querySnapshot =  await getDocs(query(collection(db, 'users'), 'email', '==', userEmail));
        // Rest of the code for updating the profile picture
        // ...
      } else {
        console.error('User not authenticated'); // Handle case when user is not authenticated
      }

      const storageRef = ref(storage, `profilePictures/${profilePicture.name}`);
      uploadBytes(storageRef, profilePicture)
        .then(() => {
          return getDownloadURL(storageRef);
        })
        .then((url) => {
          // Update the profile picture URL in Firebase Firestore
          const userDocRef = doc(db, 'users', "4hsa6AMMKj0Sfq803zfx" ); // Update the document path and user_id with your specific data
          updateDoc(userDocRef, {
           photoUrl: url
          })
            .then(() => {
              console.log('Profile picture updated successfully');
              setProfilePictureUrl(url); // Update the profile picture URL in the state
            })
            .catch((error) => {
              console.error('Error updating profile picture:', error);
            });
        })
        .catch((error) => {
          console.error('Error uploading profile picture:', error);
        });
    }
  };
  // if (!querySnapshot.empty) {
  //   // If the query returns a matching document, update the document with the user's profile picture URL
  //   const userDocRef = doc(db, 'users', querySnapshot.docs[0].id); // Use the retrieved document ID
  //   updateDoc(userDocRef, {
  //     photoUrl: uid
  //   })
  //   .then(() => {
  //     console.log('Profile picture updated successfully');
  //     setProfilePictureUrl(uid); // Update the profile picture URL in the state
  //   })
  //   .catch((error) => {
  //     console.error('Error updating profile picture:', error);
  //   });
  // } else {
  //   console.error('User not found'); // Handle case when user is not found
  // }

  return (
    <div>
      <h1>Profile</h1>
      {/* Display the profile picture using the profile picture URL from Firebase, or show an avatar if not available */}
      {profilePictureUrl ? (
        <Avatar src={profilePictureUrl} alt="Profile" sx={{ width: 200, height: 200 }} />
      ) : (
        <Avatar alt="Profile" sx={{ width: 200, height: 200 }}>
          {/* Display the user's initials as fallback in the avatar */}
          {profilePicture ? profilePicture.name.charAt(0).toUpperCase() : ''}
        </Avatar>
      )}
      <input onChange={handleFileChange} type="file" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ProfilePicture;


