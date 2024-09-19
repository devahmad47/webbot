// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy5SeyAAohHlQttnmCx9hcO7jhXMhBT08",
  authDomain: "fmadmin-b63bb.firebaseapp.com",
  projectId: "fmadmin-b63bb",
  databaseURL:"https://fmadmin-b63bb-default-rtdb.firebaseio.com",
  storageBucket: "fmadmin-b63bb.appspot.com",
  messagingSenderId: "994471553019",
  appId: "1:994471553019:web:45e07d81069aa55dc2cd5e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)