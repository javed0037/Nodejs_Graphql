import React,{ Component } from 'react';
import './Auth.css'

class Auth extends Component {

    render(){
        return(
           <form className="auth-form">
               <div className = "form-control">

                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" />
        
               </div>
               <div className = "form-control">
                   <label htmlFor = "password">Password</label>
                   <input type = "password" id = "password" />
               </div>
               <div className = "form-actions">
                   <button type ="button">Switch to sign up</button>
                   <button type ="submit">Submit</button>

               </div>
           </form>
            )
    }
}


export default Auth;