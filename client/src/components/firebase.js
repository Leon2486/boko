import firebase from "firebase/app";
import "firebase/firestore";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "rising-study-318312.firebaseapp.com",
  projectId: "rising-study-318312",
  storageBucket: "rising-study-318312.appspot.com",
  messagingSenderId: "397533702236",
  appId: "1:397533702236:web:3432bec055af143addde99",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
