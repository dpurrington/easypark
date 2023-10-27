// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCB_c4zDyeIAynbTbJxMjnSl3TQ9aiDFPw",
  authDomain: "easypark-5e3b6.firebaseapp.com",
  databaseURL: "https://easypark-5e3b6-default-rtdb.firebaseio.com",
  projectId: "easypark-5e3b6",
  storageBucket: "easypark-5e3b6.appspot.com",
  messagingSenderId: "940781219307",
  appId: "1:940781219307:web:791178a252752501aa7dae",
  measurementId: "G-26Q2V5SGXE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
