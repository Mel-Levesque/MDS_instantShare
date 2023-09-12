import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Firebase init
//import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBELCFXp2Bo_09bjHuk2HIBhqBXXMEVJrM",
  authDomain: "instantsharebase.firebaseapp.com",
  projectId: "instantsharebase",
  storageBucket: "instantsharebase.appspot.com",
  messagingSenderId: "784244223722",
  appId: "1:784244223722:web:d3ba53883a883489fdf193",
  measurementId: "G-FNFZ8SV1RJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
process.env.FIRESTORE = app.firestore();
const analytics = getAnalytics(app);

// Now you can use Firebase services in your React app
//const firestore = firebase.firestore();
//process.env.FIRESTORE = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
