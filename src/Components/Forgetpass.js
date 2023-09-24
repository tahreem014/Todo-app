import React, { useState } from 'react'
import'../styles/Forgetpass.css';

function Forgetpass() {
  const [email,setEmail] = useState();

  const signIn = (e) => {
    e.preventDefault(); 
    
  };

  return (
    <div className='password'>
      <h2>Forget Password</h2> 
        <div className="user-box">
                <input type="text" name="email" required=''  placeholder='Username'
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="button-form">
               <button className="btn" type='submit' 
              onSubmit={signIn}>Reset password</button>
            </div>
    </div>
  )
}

export default Forgetpass
