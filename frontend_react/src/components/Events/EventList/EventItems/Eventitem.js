import React from 'react';
import './EventItem.css';

const eventItems = props => (
     
    <li key={props.eventId} className = "event_list_item">
    <div>
        <h1>{props.title}</h1>
        <h2>{props.price}- {new Date(props.date).toLocaleDateString()}</h2>
    </div>
    <div>
        {
         props.userId === props.creatorId ? (<p>You are the owner of this event</p>) : 
        (<button className="btn" onClick = {props.onDetails.bind(this,props.eventId)}>View Details</button>)
        }
        </div>
        
    </li>
);



export default eventItems;
