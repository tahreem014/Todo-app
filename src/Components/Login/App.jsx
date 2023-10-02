import React, { useState, useEffect } from "react";

//import firebase
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { get, ref, set } from "firebase/database";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

//import files
import "./Style.css";

// import icons
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

// Router Link
import { Link } from "react-router-dom";

function Login() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState([]);
  console.log("before login");

  const logIn = async () => {
    // e.preventDefault();
    console.log("before try");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("after try");
      const user = auth.currentUser;
      if (user) {
        console.log("User is signed in:", user.email);
      
      }

      // Attempt to fetch data from realtime database
      //   const dbRef = ref(db, "/userData/-NfdgbTs5E3T3TlUrzkN/email");
      //   console.log("Reference path:", dbRef.toString());

      //   const snapshot = await get(dbRef);
      //   console.log("Get data snapshot:", snapshot);

      //   if (snapshot.exists()) {
      //     const data = snapshot.val();
      //     console.log("Data from Realtime Database:", data);
      //   } else {
      //     console.log("No data available in the Realtime Database.");
      //   }
      // } else {
      //   console.log("User is not signed in.");
      // }

      // const dbRef = ref(db, '/userData/-NfdgbTs5E3T3TlUrzkN/email');
      // console.log('reference path')
      // const snapshot = await get(dbRef);
      // console.log('get data')
      // if (snapshot.exists()) {
      //   const data = snapshot.val();
      //   console.log("Data from Realtime Database:", data);
      // } else {
      //   console.log("No data available in the Realtime Database.");
      // }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // fetch data from firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userData"));
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserData(newData);
        console.log("email", newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (auth.currentUser) {
      fetchData();
    }
  }, [auth.currentUser]);

  return (
    <div>
      <div className="login-box">
        <h2>Login</h2>

        <div className="user-box">
          <input
            type="text"
            name="email"
            required=""
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <span className="icon">
          {open === false ? (
            <FaEye onClick={toggle} />
          ) : (
            <FaEyeSlash onClick={toggle} />
          )}
        </span>
        <div className="user-box ">
          <input
            type={open === false ? "password" : "text"}
            name="password"
            required=" "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button">
          <Link to="/Forgetpassword" className="link">
            Forget password{" "}
          </Link>
        </div>

        <div className="button">
          <Link to="/home">
            <button className="btn" type="submit" onClick={logIn}>
              Sign In
            </button>
          </Link>
        </div>

        <div className="button">
          <p>Don't have an account</p>
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
