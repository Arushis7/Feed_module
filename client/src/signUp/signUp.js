import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import './signUp.css';

class SignUp extends Component {
  constructor(props){
        super(props);
        console.log(props);
        this.state = {email:"" , password:""};
  }

  render() {
    return (
      <div className="SignIn">
      <div className="Login-input"> <input type="text" onChange={this.changeEmail} placeholder="Enter Name" value={this.state.email} /> </div>
      <div className="Login-input"> <input type="email" onChange={this.changeEmail} placeholder="Enter Email" value={this.state.email} /> </div>
      <div className="Login-input"> <input type="Password" onChange={this.changeEmail} placeholder="Enter Password" value={this.state.email} /> </div>
      <div className="Login-input"> <input type="password" onChange={this.changeEmail} placeholder="confirm password" value={this.state.email} /> </div>
      </div>
      );
    }
}

export default SignUp;
