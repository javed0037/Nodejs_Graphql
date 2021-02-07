import React, {Component} from 'react';
import './Event.css';
import Model from '../components/Model/Model';
import BackBrop from '../components/BackDrops/BackBrop';
import AuthContext from '../context/auth-context'

class Event extends Component {
    state ={
         creating:false,
         events:[]
    }

    static contextType = AuthContext
    constructor(props){
        super(props);
        this.titleRef = React.createRef();
        this.priceRef = React.createRef();
        this.dateRef = React.createRef();
        this.descriptionRef = React.createRef();

    }

    componentDidMount(){
        this.fetchedEvents();
    }

    startCreateEventHandler = ()=>{
        this.setState({
            creating:true
        })
    }
 modelCancelHandler =()=>{
this.setState({
    creating:false
})
 }

 modelConfirmHandler = ()=>{
    this.setState({
        creating:false
    })

    const title =  this.titleRef.current.value;
    const price =  +this.priceRef.current.value;
    const date =  this.dateRef.current.value;
    const description =  this.descriptionRef.current.value;
    console.log("price",price);
    if( 
        title.trim().length===0 ||
        price === 0 ||
        date.trim().length ===0 || 
        description.trim().length ===0
        )
        {  
        return;
    }

    const event = {title, price, date,description};
    const token = this.context.token;
    let requestBody = {
            query: `
            mutation {
                createEvent(eventInput:{title: "${title}",price: ${price},date:"${date}", description:"${description}"}){
                    _id
                    title
                    description
                    price
                    date
                }
            }
            ` 
        }
    
        fetch('http://localhost:5000/graphql',{
            method: "POST",
            body: JSON.stringify(requestBody),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
    
        }).then(res=>{
            console.log("javed",res.status);
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Faliled')
            }
            return res.json()
        }).then(resData=>{
            if(resData.data){
                this.fetchedEvents()
            }
            console.log('data',resData);
        }).catch(e=>{
            console.log('error',e);
        }) 
    console.log(event)
 }

// function use to handle getting event data

fetchedEvents = ()=>{
    this.setState({
        creating:false
    })
    const token = this.context.token;
    let requestBody = {
            query: `
            query {
                events {
                    _id
                    title
                    description
                    price
                    date
                }
            }
            ` 
        }
    
        fetch('http://localhost:5000/graphql',{
            method: "POST",
            body: JSON.stringify(requestBody),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
    
        }).then(res=>{
            console.log("javed",res.status);
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Faliled')
            }
            return res.json()
        }).then(resData=>{
            if(resData.data){
            const events = resData.data.events;
            this.setState({
                events
            })
            }
        }).catch(e=>{
            console.log('error',e);
        }) 
 }







    render(){

        const eventList = this.state.events.map(event=>{
            return  <li key={event._id} className = "event_list_item">{event.title}</li>
             
        })
        return(
            <React.Fragment>
                {this.state.creating && <BackBrop />}
                {this.state.creating && <Model title = "Add Event" Cancel Confirm onCancel = {this.modelCancelHandler} onConfirm = {this.modelConfirmHandler}>
                 <form>
                     <div className ="form-control">
                         <label htmlFor="title">Title</label>
                         <input type = "text" id = "title" ref={this.titleRef}></input>
                     </div>
                     <div className ="form-control">
                         <label htmlFor="price">Price</label>
                         <input type = "number" id = "price" ref= {this.priceRef}></input>
                     </div>
                     <div className ="form-control">
                         <label htmlFor="date">Date</label>
                         <input type = "datetime-local" id = "date" ref = {this.dateRef}></input>
                     </div>
                     <div className ="form-control">
                         <label htmlFor="description">Description</label>
                         <textarea id="description" rows="4" ref= {this.descriptionRef} />
                     </div>
                 </form>
                </Model>}
                {this.context.token &&
                <div className ="events-control">
                <p>Share Your Event</p>
                 <button className="btn" onClick = {this.startCreateEventHandler}>Create event</button>
                </div>
    }
                <ul className = "event_list">
                    {eventList}
                </ul>
            </React.Fragment>
            
        )
    }
}

export default Event;