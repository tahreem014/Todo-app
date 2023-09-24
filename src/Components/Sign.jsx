import React, {useEffect, useState} from 'react'


 //import firebase
import {auth, googleProvider} from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import {db} from '../config/firebase'
import {query, addDoc, collection, where, getDocs} from "firebase/firestore"

//import files
import'../styles/Sign.css';
// import Forgetpassword from './Forgetpass';
// import Home from './Home';

// import icons 
import {FaEyeSlash} from 'react-icons/fa'
import {FaEye} from 'react-icons/fa'

// Router Link 
import { Link, useNavigate} from 'react-router-dom';


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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


        const validation = () => password === confirmPassword;

        console.log(auth?.currentUser?.email)
        console.log(auth?.currentUser?.photoURL)

        const signIn = async (e) => {
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

        const signInWithGoogle = async (e) => {
          

          try{
           const res = await signInWithPopup(auth, googleProvider) 
          const user = res.user;
          const q = query(collection(db, "users"), where("uid", "==", user.uid));
          const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    console.log("Data added to Firestore successfully");
          }
           catch(err){
            console.error(err);
           }

           e.preventDefault(); // Prevent the form from submitting
          
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

        
        // const moviesCollectionRef = collection(database, "")
      
        // const [movieList, setMovieList] = useState();

        // useEffect(() => {
        //   const getMovieList = async () => {
        //     try{
        //     const data = await getDoc(moviesCollectionRef)
        //     const filterData = data.doc.map((doc) => ({
        //       ...doc.data(),
        //       id: doc.id

        //     }));
        //     }catch(err){
        //       console.error(err)
        //     }
        //   };
        //   getMovieList();
        //           }, []);
        
        const navigate = useNavigate()
    
        return (
    <div>
      <div className="login-box">
        <h2>Login</h2>

        <form 
        onSubmit={signIn}
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
               onSubmit={signIn}>Sign In</button>
               </Link>
            </div>


            <div className="button-form">
              <Link to='/home'> 
              <button className="submit"  
              onClick={signInWithGoogle}>Sign In with Google</button>
              </Link>
            </div>


            
            <div className="button-form">
               <button className="submit"  
              onClick={logout}>Logout</button>
            </div>



            <div className='button-form'>
            <button className='submit' onClick={() => navigate('/forgetpassword')}>Forget password </button>
            </div>

            
            
      

        </form>
    </div>
    
    </div>
        )
}

export default Sign
