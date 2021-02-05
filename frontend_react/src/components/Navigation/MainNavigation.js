import React from 'react';
import { NavLink } from 'react-router-dom'
import './MainNavigation.css'
import AuthContext  from '../../context/auth-context'


const mainNavigation = props => (
<AuthContext.Consumer>
    {(context)=>{
        console.log(context);
        return(
<header className="main-navigation">
    <div className ="main-navigition_logo">
    <h1> Easy Navigation</h1>
       </div>
        <nav className = "main-navigation_item">
            <ul>
                {!context.token && (
                <li><NavLink to="/auth">Authentation</NavLink></li>
                )}
                <li><NavLink to ="/event">Event</NavLink></li>
                {context.token &&(
                <React.Fragment>
                    <li><NavLink to ="/booking">Booking</NavLink></li>
                     <li><button onClick = {context.logout}>logout</button></li>
                </React.Fragment>
                )}

            </ul>
        </nav>
</header>

        )
    }}
</AuthContext.Consumer>
);


export default mainNavigation;