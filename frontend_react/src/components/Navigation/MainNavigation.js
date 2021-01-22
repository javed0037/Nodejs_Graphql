import React from 'react';
import { NavLink } from 'react-router-dom'
import './MainNavigation.css'
const mainNavigation = props => (
<header className="main-navigation">
    <div className ="main-navigition_logo">
    <h1> Easy Navigation</h1>
    </div>
        <nav className = "main-navigation_item">
            <ul>
                <li><NavLink to="/auth">Authentation</NavLink></li>
                <li><NavLink to ="/event">Event Navigation</NavLink></li>
                <li><NavLink to ="/booking">Booking Navigation</NavLink></li>

            </ul>
        </nav>
</header>
);


export default mainNavigation;