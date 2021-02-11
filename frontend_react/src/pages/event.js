import React, {Component} from 'react';
import './Event.css';
import Model from '../components/Model/Model';
import BackDrop from '../components/BackDrops/BackBrop';
import AuthContext from '../context/auth-context';
import EventList  from '../components/Events/EventList/EventList';
import Spinner from '../components/Spinner/Spinner'
class Event extends Component {
    state ={
         creating:false,
         events:[], 
         isloading: false,
         selectedEvent: null
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
    creating:false,
    selectedEvent: null

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
                // this.fetchedEvents()
                this.setState(prevState=>{
                    const updatedEvent = [...prevState.events];
                    updatedEvent.push({
                        _id: resData.data.createEvent._id,
                        title: resData.data.createEvent.userId,
                        description: resData.data.createEvent.description,
                        date: resData.data.createEvent.date,
                        price: resData.data.createEvent.price,
                        creator:{
                           _id: this.context.userId
                        }

                        
                    })
                    return { events: updatedEvent };
                })
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
    this.setState({
        isloading: true
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
                    creator{
                        _id
                        email
                      }
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
            this.setState({
                isloading: false
            })
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
            this.setState({
                isloading: false
            })
        }) 
 }




 ShowEventDetailsHandler = eventId =>{
     console.log('calling here',eventId);
    this.setState(prevState=>{
        const selectedEvent =  prevState.events.find(e=>e._id === eventId)
        return {selectedEvent: selectedEvent}

    }
       //  selectedEvent:
    )

}

bookEventHandler = ()=>{

}
    render(){
        return(
            <React.Fragment>
                {(this.state.creating || this.state.selectedEvent )&&<BackDrop />}
                {this.state.creating && <Model title = "Add Event" 
                Cancel
                Confirm
                onCancel = {this.modelCancelHandler}
                onConfirm = {this.modelConfirmHandler}
                ConfirmText=  "Confirm"
                >
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

                {this.state.selectedEvent && (<Model title = {this.state.selectedEvent.title} 
                Cancel
                Confirm
                onCancel = {this.modelCancelHandler} 
                onConfirm = {this.bookEventHandler}
                ConfirmText = "Book"
                >
                 <h1>{this.state.selectedEvent.title}</h1>
                 <h2>{this.state.selectedEvent.price}</h2>
                 <p>{this.state.selectedEvent.description}</p>
                </Model>)
                }
                {this.context.token &&
                <div className ="events-control">
                <p>Share Your Event</p>
                 <button className="btn" onClick = {this.startCreateEventHandler}>Create event</button>
                </div>
    }
            {this.state.isloading ? (<Spinner/>) :
             (<EventList events={this.state.events}
             authUserId = {this.context.userId}
             eventViewDetails={this.ShowEventDetailsHandler} />)
            }
            </React.Fragment>

            
        )
    }
}

export default Event;