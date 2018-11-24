import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import './login.css';
import SignUp from '../signUp/signUp';

class Login extends Component {
  constructor(props){
        super(props);
        this.state = {email:"" , password:"", loginTab:false};
        this.access_token = null;
    }

    onLoginSucess = (val) => {
    //  var val = true; // somehow calculate new value;
      this.props.onLoginSucess(val);
    }

    onSignUpSuccess  = (val) => {
        var newVal = val;
        this.setState({loginTab:true})
      }

    changeEmail = (e) => {
    let newVal = e.target.value;
    this.setState({email:newVal});
    }

    changePassword = (e) => {
    let newVal = e.target.value;
    this.setState({password:newVal});
    }

    changeLoginTab = (val) => {
    this.setState({loginTab:val});
    }

    formSubmit = () => {
      let payload = {email:this.state.email, password:this.state.password}
      var that = this;
      axios({
         method: 'post',
         url: '/userDetails',
         data: payload
       }).then(function (response) {
          if(response.data.code == 1){
            console.log('response',response.data);
             localStorage.setItem('access_token',response.data.access_token);
             localStorage.setItem('userDetails',response.data.details);
            setTimeout(function() {
              if(localStorage.access_token !== null){
                let newVal = true;
                that.onLoginSucess(newVal);
              }
            },500)
          }
          else{
            alert("data hasn't matched!!!")
          }
        })
      }

      render() {
      if(!this.props.LogIn){
        return (
          <div className="login-wrapper">
            <div className="options"> <a className="btn" onClick={() => this.changeLoginTab(true)}> Login </a> <a className="btn" onClick={() => this.changeLoginTab(false)}> SignUp </a> </div>
              <div className={this.state.loginTab? 'Login':'none'}>
                <header className="Login-header">
                    Login
                </header>
                <div className="Login-input"> <input type="email" onChange={this.changeEmail} placeholder="Enter Email" value={this.state.email} /> </div>
                <div className="Login-input"> <input type="password" onChange={this.changePassword} placeholder="Enter Password" value={this.state.password} /> </div>
                <button className="btn btn-default" type="submit" onClick={()=> this.formSubmit()} > Submit </button>
              </div>
              <SignUp onSignUpSuccess={this.onSignUpSuccess} loginTab={this.state.loginTab} />

          </div>
        );
      }
      else return false;
    }

}

export default Login;
