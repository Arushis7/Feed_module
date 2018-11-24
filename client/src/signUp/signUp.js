import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import './signUp.css';

class SignUp extends Component {
  constructor(props){
        super(props);
        console.log(props);
        this.state = {name:"",email:"" , password:"",confirmPsd:"",error:""};
  }

  onSignUpSuccess = (val) => {
    var val = true; // somehow calculate new value;
    this.props.onSignUpSuccess(val);
  }

  changeName = (e) => {
  let newVal = e.target.value;
  this.setState({name:newVal});
    if(newVal == ""){
      this.setState({error:"Name is mandatory"});
    }
}

  changeEmail = (e) => {
  let newVal = e.target.value;
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  this.setState({email:newVal});
  if(newVal == "" || ! regexEmail.test(newVal.toLowerCase())){
    this.setState({error:"Enter a valid email"});
    }
  }

  changePassword = (e) => {
  let newVal = e.target.value;
  this.setState({password:newVal});
  if(newVal == ""){
    this.setState({error:"Password is mandatory"});
  }
  }

  confirmPassword = (e) => {
  let newVal = e.target.value;
  this.setState({confirmPsd:newVal});
  if(newVal == ""){
    this.setState({error:"Kindly confirm your password."});
  }
  }

  formSubmit = () => {
    if(this.state.name!=="" && this.state.email!=="" && this.state.password!=="" && this.state.confirmPsd!==""  ){
      if(this.state.password == this.state.confirmPsd){
        let payload = {name:this.state.name,email:this.state.email, password:this.state.password}
        let that = this;
        axios({
           method: 'post',
           url: '/createUser',
           data: payload
         }).then(function (response) {

            if(response.data.Error){
              that.setState({
                error:"Invalid login credentials!"
              })
            }
            else{
              that.setState({
                error:""
              })
              that.onSignUpSuccess(true);
            }
          }).catch(function (error) {
             console.log(error);   });
      }
      else{
        this.setState({
          error:"Both password are not matching."
        })
      }
    }
    else{
      this.setState({
        error:"All fields are mandatory."
      })
    }
    }


  render() {
    return (
      <div className={!this.props.loginTab? 'SignIn':'none'} >
      <header className="Login-header">
          SignUp
      </header>
      <div className="Login-input"> <input type="text" onChange={this.changeName} placeholder="Enter Name" value={this.state.name} required="true" /> </div>
      <div className="Login-input"> <input type="email" onChange={this.changeEmail} placeholder="Enter Email" value={this.state.email} required="true" /> </div>
      <div className="Login-input"> <input type="Password" onChange={this.changePassword} placeholder="Enter Password" value={this.state.password} required="" /> </div>
      <div className="Login-input"> <input type="password" onChange={this.confirmPassword} placeholder="confirm password" value={this.state.confirmPsd} required="" /> </div>
      <button className="btn btn-default" type="submit" onClick={() => this.formSubmit()}> Submit </button>
      <p className="error"> {this.state.error} </p>
      </div>
      );
    }
}

export default SignUp;
