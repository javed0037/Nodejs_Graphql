import React from 'react';
import EventItem from './EventItems/Eventitem'

import './EventList.css';


const eventList = props=>{
   const events =  props.events.map(event =>{
      console.log(event);
        return <EventItem 
        key = {event._id}
        eventId = {event._id}
        price = {event.price}
        date={event.date}
        title ={event.title}
        userId = {props.authUserId}
        creatorId = {event.creator._id}
        onDetails = {props.eventViewDetails}
        />
    })
   return <ul className = "event_list">{events} </ul>

}


export default eventList;