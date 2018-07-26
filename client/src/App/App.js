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
        loggedIn:false
      }
    }

    componentDidMount() {
    axios.get(`/me`)
      .then(res => {
        const response = res.data;
        this.setState({name:res.data.name,project:res.data.project})
      })
    }

  render() {
      const logIn = this.state.loggedIn;
      return (
        <div className="App">
            <Feed LogIn={logIn}/>
            <Login LogIn={logIn} />
        </div>
      );
    }
}

export default App;
