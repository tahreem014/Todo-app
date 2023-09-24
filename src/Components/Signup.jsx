import React, {useState} from 'react'


 //import firebase
import {auth } from "../config/firebase"
import { createUserWithEmailAndPassword} from 'firebase/auth';
import {db} from '../config/firebase'
import {addDoc, collection} from "firebase/firestore"

//import files
import'../styles/Signup.css';
// import Forgetpassword from './Forgetpass';
// import Home from './Home';

// Router Link 
import { Link} from 'react-router-dom';

// import icons 
import {FaEyeSlash} from 'react-icons/fa'
import {FaEye} from 'react-icons/fa'


function Signup() {
const [open, setOpen]  = useState(false)

const toggle=()=>{
  setOpen(!open)
}


  const [email, setEmail] = useState("")
  const [name, setName] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


        // validation 
        const validation = () => password === confirmPassword;

        console.log(auth?.currentUser?.email)
        console.log(auth?.currentUser?.photoURL)


        // Sign IN 
        const signUp = async (e) => {
          e.preventDefault(); // Prevent the form from submitting
          if (!validation()) {
            alert('Password not matched');
            return; // Don't proceed to Home page if password is not matched
          }
          // TODO: Handle successful form submission (e.g., navigate to Home page)
          else{
           
          }

          try{
           const res = await createUserWithEmailAndPassword(auth, name, email, password, confirmPassword)
           console.log(res)
           const user = res.user;
           await addDoc(collection(db, "users"), {
             uid: user.uid,
             name,
             authProvider: "local",
             email,
           });
           console.log("Data added to Firestore successfully");
          }

           catch(err){
            console.error(err);
            alert(err.message);
           }

          
        };        
    
        return (
    <div>
      <div className="signup-box">
        <h2>Login</h2>

        <form 
        onSubmit={signUp}
        >
          <div className='user-box'>
          <input
          type="text" required=''
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        /></div>

            <div className="user-box">
                <input type="text" name="email" required=''  placeholder='Username'
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            
             <span className='icon'> 
                { open === false? 
                <FaEye onClick={toggle}/>:
                <FaEyeSlash onClick={toggle} />}
                </span>
                <div className="user-box ">
                <input type={open === false? 'password': 'text'}
                 name="password" required=" " placeholder='Password' 
                 value={password} onChange={(e) => setPassword( e.target.value )}
                 />
            </div>
                

            <div className="user-box">
                <input type="confirmPassword" name="confirmPassword" 
                required=" " placeholder='Confirm Password' 
                value={confirmPassword} onChange={(e) => setConfirmPassword( e.target.value )}
                />
            </div>

            <div className='match'> { validation ()? '' :
             'Password not matched'}</div>


            <div className="button-form">
              <Link to='/home'> 
              <button className="submit" type='submit'
               onSubmit={signUp}>Sign up</button>
               </Link>
            </div>

            
        </form>
    </div>
    
    </div>
        )
}

export default Signup
