import React, {useState, useEffect} from 'react'
import'./Style.css';

// import from firebase
import{auth } from "../../config/firebase" 
import { sendPasswordResetEmail } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";


function Forgetpass() {
  const [email,setEmail] = useState('');
  const [userData, setUserData] = useState([]);

  const resetPassword = async ( ) => { 
    try {
      console.log("rest password")
      // Send a password reset email to the user's email address
      await sendPasswordResetEmail(auth, email);

      // Provide feedback to the user that the password reset email has been sent
      alert('Password reset email sent. Check your email inbox.');

      // Optionally, you can redirect the user to a login page or any other page
      // history.push('/login');
      console.log("sent email for password")
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
    }
    
  };

  return (
    <div className='password'>

      <h2>Forget Password</h2> 

        <div className="box">
                <input type="text" 
                name="email" 
                required='' 
                placeholder='Username'
                value={email}
                 onChange={(e) => setEmail(e.target.value)} 
                />

            </div>

            <div className="flex">
               <button className="btn" type='submit' 
              onClick={() => resetPassword()}
              > Reset password
              </button>

            </div>
    </div>
  )
}

export default Forgetpass
