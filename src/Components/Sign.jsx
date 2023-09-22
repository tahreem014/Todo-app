import React, {useEffect, useState} from 'react'


 //import firebase
import {auth, googleProvider} from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import {database} from '../config/firebase'
import {getDoc, collection} from "firebase/firestore"

//import files
import'../styles/Sign.css';

// import icons 
import {FaEyeSlash} from 'react-icons/fa'
import {FaEye} from 'react-icons/fa'

// Router Link 
import {Link} from 'react-router-dom';


function Sign() {
const [open, setOpen]  = useState(false)

const toggle=()=>{
  setOpen(!open)
}

  // const [formData, setFormData] = useState({
  //           email: "",
  //           password: "",
  //           confirmPassword: ""
  //       })

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


        const validation = () => password === confirmPassword;

        console.log(auth?.currentUser?.email)
        console.log(auth?.currentUser?.photoURL)

        const signIn = async (e) => {
          try{
           await createUserWithEmailAndPassword(auth, email, password, confirmPassword) }
           catch(err){
            console.error(err);
           }

          e.preventDefault(); // Prevent the form from submitting
          if (!validation()) {
            alert('Password not matched');
            return; // Don't proceed to Home page if password is not matched
          }
          // TODO: Handle successful form submission (e.g., navigate to Home page)
          else{
           
          }
        };

        const signInWithGoogle = async (e) => {
          try{
           await signInWithPopup(auth, googleProvider) }
           catch(err){
            console.error(err);
           }

          e.preventDefault(); // Prevent the form from submitting
          if (!validation()) {
            alert('Password not matched');
            return; // Don't proceed to Home page if password is not matched
          }
          // TODO: Handle successful form submission (e.g., navigate to Home page)
          else{
           
          }
        };


        const logout = async () => {
          try{
           await signOut(auth) }
           catch(err){
            console.error(err);
           }

          // e.preventDefault(); // Prevent the form from submitting
          // if (!validation()) {
          //   alert('Password not matched');
          //   return; // Don't proceed to Home page if password is not matched
          // }
          // // TODO: Handle successful form submission (e.g., navigate to Home page)
          // else{
           
          // }
        };

        
        const moviesCollectionRef = collection(database, "")
      
        const [movieList, setMovieList] = useState();

        useEffect(() => {
          const getMovieList = async () => {
            const data = await getDoc(moviesCollectionRef)
          };
          
                  }, []);
        
    
        return (
    <div>
      <div className="login-box">
        <h2>Login</h2>

        <form 
        // onSubmit={[signIn, signInWithPopup, logout]}
        >

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
              <Link to='/home'> <button className="submit" type='submit' onSubmit={signIn}>Sign In</button></Link>
            </div>


            <div className="button-form">
              <Link to='/home'> <button className="submit"  
              onClick={signInWithGoogle}>Sign In with Google</button></Link>
            </div>


            
            <div className="button-form">
               <button className="submit"  
              onClick={logout}>Logout</button>
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
