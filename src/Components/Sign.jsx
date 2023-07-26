import React, {useState} from 'react'

import {FaEyeSlash} from 'react-icons/fa'
import {FaEye} from 'react-icons/fa'


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

        const handleSubmit = (e) => {
          e.preventDefault(); // Prevent the form from submitting
          if (!validation()) {
            alert('Password not matched');
            return; // Don't proceed to Home page if password is not matched
          }
          // TODO: Handle successful form submission (e.g., navigate to Home page)
        };
      
        
    
        return (
    <div>
      <div className="login-box">
        <h2>Login</h2>

        <form 
        onSubmit={handleSubmit}
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
                <button id="submit" type='submit'>Submit</button>
            </div>

            <div className='forget'>
              <a href='forgetpassword'>Forget Password</a>
            </div>

        </form>
    </div>
    
    </div>
        )
}

export default Sign
