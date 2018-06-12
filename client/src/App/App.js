import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Feed from '../Feed/Feed.js';

class App extends Component {

      constructor (props) {
        super(props);
        this.state = {
        name: '',
        dept : ""

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
    return (
      <div className="App">
        <header className="App-header">
        <span className="User-name"> {this.state.name}  </span>
        <span className="User-name dept-name"> {this.state.project}  </span>
        </header>
        <Feed/>
      </div>
    );
  }
}

export default App;
