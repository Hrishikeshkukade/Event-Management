// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { collection } from "firebase/firestore";
import 'firebase/storage';
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "***",
  authDomain: "***",
  projectId: "***",
  storageBucket: "***",
  messagingSenderId: "***",
  appId: "***"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth();
const db = getFirestore(app);





const storage = getStorage(app);
const storageRef = ref(storage, 'images/mountains.jpg');
const mountainsRef = ref(storage, 'mountains.jpg');
const mountainImagesRef = ref(storage, 'images/mountains.jpg');
// mountainsRef.name === mountainImagesRef.name;           // true
// mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 
console.log(storageRef.name);           // "mountains.jpg"
console.log(mountainsRef.name);         // "mountains.jpg"
console.log(mountainImagesRef.name);    // "mountains.jpg"
console.log(storageRef.fullPath);       // "images/mountains.jpg"
console.log(mountainsRef.fullPath);     // "mountains.jpg"
console.log(mountainImagesRef.fullPath);
export {app, auth, storage, mountainsRef, mountainImagesRef, storageRef, db};

export async function upload(file, user) {
  const fileRef = ref(storage, user.uid + ".png")

  const snapshot = await uploadBytes(fileRef, file)
  alert("Uploaded file!")
}
