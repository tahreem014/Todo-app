import React, {useState} from 'react'
import'./Style.css';

function Forgetpass() {
  const [email,setEmail] = useState();

  const signIn = (e) => {
    e.preventDefault(); 
    
  };

  return (
    <div className='password'>
      <h2>Forget Password</h2> 
        <div className="box">
                <input type="text" name="email" required=''  placeholder='Username'
                value={email} onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="flex">
               <button className="btn" type='submit' 
              onSubmit={signIn}
              >Reset password</button>
            </div>
    </div>
  )
}

export default Forgetpass
