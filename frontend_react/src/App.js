import { Redirect, Route, BrowserRouter,Switch } from 'react-router-dom';
import React,{Component}  from 'react';

import AuthComponent from './pages/auth';
import Event from './pages/event';
import Booking from './pages/booking'
import './App.css';
import MainNavigation from './components/Navigation/MainNavigation'
import AuthContext from '../src/context/auth-context';


class App extends Component {

  state = {
    token: null,
    userId: null
  }
  
login = (token,userId,tokenExpiration) => {
  this.setState({
    token: token,
    userId: userId
  })

};

logout = () => {
  this.setState({
    token: null,
    userId: null
  })

}


  render(){
 
    return(
          <BrowserRouter>
            <AuthContext.Provider value={{token:this.state.token,userId: this.state.userId,login: this.login,logout:this.logout}}>
             <MainNavigation />
               <main className="main-content">
               <Switch>
              {this.state.token && <Redirect from = "/" to = "/event" exact />}
              {this.state.token && <Redirect from = "/auth" to = "/event" exact />}

               {!this.state.token && (
               <Route path="/auth" component= {AuthComponent} />
               )}
               <Route path="/event" component={Event} />
               {this.state.token && <Route path="/booking" component={Booking} />}
               {!this.state.token && <Redirect to = "/auth" exact />}

               </Switch>
               </main>
            </AuthContext.Provider>
          </BrowserRouter>
    );
  }
}


export default App;