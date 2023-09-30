import React from 'react'
import {auth } from "../../config/firebase"
import {signOut } from 'firebase/auth';


function Home() {

  
        // Logout 
        const logout = async (e) => {
          try{
           await signOut(auth) }
           catch(err){
            console.error(err);
           }

          e.preventDefault(); // Prevent the form from submitting
        };


  return (
    <div>
      <div className="button-form">
               <button className="submit"  
              onClick={logout}
              >Logout</button>
                </div>
    </div>
  )
}

export default Home
