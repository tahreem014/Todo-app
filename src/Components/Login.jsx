import React, { useState} from 'react'


 //import firebase
// import {auth} from "../config/firebase"
// import {signInWithEmailAndPassword} from 'firebase/auth';
// import {db} from '../config/firebase'
// import {query, addDoc, collection, where, getDocs} from "firebase/firestore"

//import files
import'./login.css';


// import icons 
import {FaEyeSlash} from 'react-icons/fa'
import {FaEye} from 'react-icons/fa'

// Router Link 
import { Link} from 'react-router-dom';


function Login() {
const [open, setOpen]  = useState(false)

const toggle=()=>{
  setOpen(!open)
}

  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")


  // const logIn = async (e) => {
  //   e.preventDefualt();

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // };

    
        return (
    <div>
      <div className="login-box">
        <h2>Login</h2>

        <form>

            <div className="user-box">
                <input type="text" name="email" required=''  placeholder='Username'
                // value={email} onChange={(e) => setEmail(e.target.value)}
                 />
            </div>
            
            
             <span className='icon'> 
                { open === false? 
                <FaEye onClick={toggle}/>:
                <FaEyeSlash onClick={toggle} />}
                </span>
                <div className="user-box ">
                <input type={open === false? 'password': 'text'}
                 name="password" required=" " placeholder='Password' 
                //  value={password} onChange={(e) => setPassword( e.target.value )}
                 />
            </div>


            <div className='button'>
            <Link to='/Forgetpassword' className='link'>Forget password </Link>
            </div>

            <div className="button">
              <Link to='/home'> 
              <button className="btn" type='submit'
              //  onSubmit={logIn}
               >Sign In</button>
               </Link>
            </div>

            <div className="button">
              <p>Don't have an account</p>
              <Link to='/signup' className='link'>Sign up</Link>
            </div>



        </form>
    </div>
    
    </div>
        )
}

export default Login
