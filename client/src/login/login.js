import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import './login.css';
import SignUp from '../signUp/signUp';

class Login extends Component {
  constructor(props){
        super(props);
        console.log(props);
        this.state = {email:"" , password:"", loginTab:false};
    }

    onLoginSucess = (val) => {
      var val = 13; // somehow calculate new value
      console.log(this.props.onLoginSucess(12));

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

      axios({
         method: 'post',
         url: '/userDetails',
         data: payload
       }).then(function (response) {
          console.log(response);
          if(response.data == "Success"){
            console.log('kjjjjjjjj');
            this.onLoginSucess;
          }
        }).catch(function (error) {
           console.log(error);});
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
                <button className="btn btn-default" type="submit" onClick={() => this.formSubmit()} > Submit </button>
              </div>
              <SignUp loginTab={this.state.loginTab} />

          </div>
        );
      }
      else return false;
    }

}

export default Login;
