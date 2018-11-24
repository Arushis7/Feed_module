import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Feed from '../Feed/Feed';
import Login from '../login/login';

class App extends Component {
      constructor (props) {
        super(props);
        this.state = {
        name: '',
        dept : "",
        loggedIn:""
      }
      if(localStorage.access_token == null || localStorage.access_token == undefined || !localStorage.access_token ){
        this.state.loggedIn = false
      }
      else this.state.loggedIn = true;
    }

    onLoginSucess = (val) =>{
      let newVal = val;
      this.setState({loggedIn: newVal});
    }

    onLogOut = (val) =>{
      let newVal = val;
      this.setState({loggedIn: newVal});
    }

    componentDidMount() {
    axios.get(`/me`)
      .then(res => {
        const response = res.data;
        this.setState({name:res.data.name,project:res.data.project})
      })
    }

  render() {
      let logIn = this.state.loggedIn;
      return (
        <div className="App">
            <Feed onLogOut={this.onLogOut} LogIn={logIn}/>
            <Login onLoginSucess={this.onLoginSucess}  LogIn={logIn} />
        </div>
      );
    }
}

export default App;
