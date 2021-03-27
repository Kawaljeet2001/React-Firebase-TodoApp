import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCnbXziVByDnbFDOV3mXX6zxJMOzG_7CxI",
    authDomain: "react-firebase-todo-174b0.firebaseapp.com",
    projectId: "react-firebase-todo-174b0",
    storageBucket: "react-firebase-todo-174b0.appspot.com",
    messagingSenderId: "698677589253",
    appId: "1:698677589253:web:8a1bcc111a2ca36ede736c",
    measurementId: "G-3P0QY24GRC"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;