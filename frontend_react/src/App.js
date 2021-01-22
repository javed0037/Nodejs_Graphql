import { Redirect, Route, BrowserRouter,Switch } from 'react-router-dom';
import React,{Component}  from 'react';

import AuthComponent from './pages/auth';
import Event from './pages/event';
import Booking from './pages/booking'
import './App.css';
import MainNavigation from './components/Navigation/MainNavigation'

class App extends Component{
  
  render(){
 
    return(
          <BrowserRouter>
          <MainNavigation />
          <main className="main-content">
             <Switch>
             <Redirect from = "/" to = "/auth" exact />
             <Route path="/auth" component= {AuthComponent}></Route>
             <Route path="/event" component={Event}></Route>
             <Route path="/booking" component={Booking}></Route>
           </Switch>
           </main>
           
          </BrowserRouter>
    );
  }
}


export default App;