
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAPFJ05GPxgsNnAkKt9sRg7phG53tKqF74",
  authDomain: "reactauth-3db27.firebaseapp.com",
  projectId: "reactauth-3db27",
  storageBucket: "reactauth-3db27.appspot.com",
  messagingSenderId: "759196240922",
  appId: "1:759196240922:web:ce44a1250b97ca96ed55a3",
  measurementId: "G-FYBT2HN5LB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


