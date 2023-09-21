import React, {useState} from 'react'


 //import firebase
import {auth} from "../config/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';



// import {initializeApp} from 'firebase/app'
// // "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// import {getAuth, onAuthStateChanged} from 'firebase/auth'
// // "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";


//import files
import'../styles/Sign.css';

// import icons 
import {FaEyeSlash} from 'react-icons/fa'
import {FaEye} from 'react-icons/fa'

// Router Link 
import {Link} from 'react-router-dom';

// Firebase 
// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyAPFJ05GPxgsNnAkKt9sRg7phG53tKqF74",
//   authDomain: "reactauth-3db27.firebaseapp.com",
//   projectId: "reactauth-3db27",
//   storageBucket: "reactauth-3db27.appspot.com",
//   messagingSenderId: "759196240922",
//   appId: "1:759196240922:web:ce44a1250b97ca96ed55a3",
//   measurementId: "G-FYBT2HN5LB"
// })

// const auth = getAuth(firebaseApp)

// onAuthStateChanged(auth, user => {
//   if(user != null){
//     console.log('logged in!');
//   } else {
//     console.log('No user');
//   }
// }) 



function Sign() {
const [open, setOpen]  = useState(false)

const toggle=()=>{
  setOpen(!open)
}

  const [formData, setFormData] = useState({
            email: "",
            password: "",
            confirmPassword: ""
        })


        const validation = () => formData.password === formData.confirmPassword;

        const signIn = async (e) => {
           await createUserWithEmailAndPassword(auth, formData.email, formData.password, formData.confirmPassword)

          e.preventDefault(); // Prevent the form from submitting
          if (!validation()) {
            alert('Password not matched');
            return; // Don't proceed to Home page if password is not matched
          }
          // TODO: Handle successful form submission (e.g., navigate to Home page)
          else{
           
          }
        };
      
        
    
        return (
    <div>
      <div className="login-box">
        <h2>Login</h2>

        <form 
        onClick={signIn}
        >

            <div className="user-box">
                <input type="text" name="email" required=''  placeholder='Username'/>
            </div>
            
            
             <span className='icon'> 
                { open === false? 
                <FaEye onClick={toggle}/>:
                <FaEyeSlash onClick={toggle} />}
                </span>
                <div className="user-box ">
                <input type={open === false? 'password': 'text'}
                 name="password" required=" " placeholder='Password' 
                 value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                 />
            </div>
                

            <div className="user-box">
                <input type="confirmPassword" name="confirmPassword" 
                required=" " placeholder='Confirm Password' 
                value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
            </div>

            <div className='match'> { validation ()? '' :
             'Password not matched'}</div>

            <div className="button-form">
              <Link to='/home'> <button id="submit" type='submit' onClick={signIn}>Sign In</button></Link>
            </div>

            <div className='forget'>
              <Link to='/forgetpassword'>Forget Password</Link>
            </div>

        </form>
    </div>
    
    </div>
        )
}

export default Sign
