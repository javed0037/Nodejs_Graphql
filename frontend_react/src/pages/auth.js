import React,{ Component } from 'react';
import './Auth.css'
import AuthContext from '../context/auth-context';



class Auth extends Component {

    state = {
    isLogin: true
}

static contextType = AuthContext;

constructor(props){
    super(props);
    this.emailEL = React.createRef();
    this.passwordEL = React.createRef();
}

swithModeHandler =()=>{
    this.setState(preState=>{
        return  {
            isLogin: !preState.isLogin
        }
    })
}


submitHandler=(e)=>{
    e.preventDefault();
    const emailEL = this.emailEL.current.value
    const passwordEL = this.passwordEL.current.value
    
    if(emailEL.trim().length ===0 && passwordEL.trim().length ===0){
        return;
    }
    console.log('state',this.state.isLogin);


let requestBody = {
    query:`
        query{
            login(email:"${emailEL}",password:"${passwordEL}"){
                userId
                token
                tokenExpiration
              }
        }
    `
}
if(!this.state.isLogin){
     requestBody = {
        query: `
        mutation {
            createUser(UserInput:{email: "${emailEL}",password: "${passwordEL}"}){
                _id
                email
            }
        }
        ` 
    }
}
    fetch('http://localhost:5000/graphql',{
        method: "POST",
        body: JSON.stringify(requestBody),
        headers:{
            'Content-Type': 'application/json'
        }

    }).then(res=>{
        console.log("javed",res.status);
        if(res.status !== 200 && res.status !== 201) {
            throw new Error('Faliled')
        }
        return res.json()
    }).then(resData=>{
        if(resData.data.login.token){
            this.context.login(resData.data.login.token,resData.data.login.userId,resData.data.login.tokenExpiration);
        }
        console.log('data',resData);
    }).catch(e=>{
        console.log('error',e);
    })    


}


    render(){
        return(
           <form className="auth-form" onSubmit = {this.submitHandler}>
               <div className = "form-control">

                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" ref = {this.emailEL} />
               </div>
               <div className = "form-control">
                   <label htmlFor = "password">Password</label>
                   <input type = "password" id = "password" ref ={this.passwordEL}/>
               </div>
               <div className = "form-actions">
               <button type ="submit">Submit</button>
               <button type ="button" onClick={this.swithModeHandler}>Switch to {this.state.isLogin? "Signup": "login"}</button>
               </div>
           </form>
            )   
    }
}


export default Auth;