import React, {useState} from 'react'


 //import firebase
import {auth } from "../config/firebase"
import {createUserWithEmailAndPassword} from 'firebase/auth';


//import files
import './signup.css'

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
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  console.log('correct')

 

        // validation 
        const validation = () => password === confirmPassword;
        console.log('validate')


        console.log(auth?.currentUser?.email)


        // Sign Up
        const signIn = async () => {
            // e.preventDefault(); // Prevent the form from submitting
                if (!validation()) {
                  alert('Password not matched');
                  return; // Don't proceed to Home page if password is not matched
                }
                // TODO: Handle successful form submission (e.g., navigate to Home page)
                else{
                 
                }

            console.log('before')
            try {
                await createUserWithEmailAndPassword(auth, email, password, confirmPassword);
                const userData = {
                  email,
                  password,
                  confirmPassword,

            }; 
            const options = {
              method: 'POST',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData),
            };

            const res = await fetch
            ('https://reactauth-3db27-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json' ,
            options)
            if(res.ok){
              alert('Data store')
            } else{
              alert('Error occured')
            }

          }
          catch (err) {
            console.error(err);
            alert(err.message);
        }


        };
                
                    
    
        return (
    <div>
      <div className="signup-box">
        <h2>Sign Up</h2>

            <div className="user">
                <input type="text" name="email" required=''  placeholder='Username'
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            
             <span className='icon'> 
                { open === false? 
                <FaEye onClick={toggle}/>:
                <FaEyeSlash onClick={toggle} />}
                </span>
                <div className="user ">
                <input type={open === false? 'password': 'text'}
                 name="password" required=" " placeholder='Password' 
                 value={password} onChange={(e) => setPassword( e.target.value )}
                 />
            </div>
                

            <div className="user">
                <input type="password" name="confirmPassword" 
                required=" " placeholder='Confirm Password' 
                value={confirmPassword} onChange={(e) => setConfirmPassword( e.target.value )}
                />
            </div>

            <div className='match'> { validation ()? '' :
             'Password not matched'}</div>


            <div className="button-form">
              <Link to='/home'> 
              <button className="submit" type='submit'
               onClick={signIn}
               >Sign up</button>
               </Link>

            </div>
    </div>
    
    </div>
        )
}

export default Signup
