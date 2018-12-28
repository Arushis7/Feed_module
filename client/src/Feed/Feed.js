import React, { Component } from 'react';
import axios from 'axios';
import { Appbar, Button, Container } from 'muicss/react';
import './Feed.css';
import CreateFeed from './CreateFeed/CreateFeed';

class Feed extends Component {
  constructor(props){
        super(props);
        this.state = {feed :"",timeStamp:"",value:""};
        this.onChange = (e) => {
        let newVal = e.target.value;
        this.setState({value:newVal});
        }
    }

      logOut= ()=> {
      localStorage.clear();
      let logOut = false;
      this.props.onLogOut(logOut);
      }

      onLogOut = (val) => {  // returns props to the parent on log out
        this.props.onLogOut(val);
      }


    componentDidMount() {
      axios.get(`/feed`)
        .then(res => {
          const response = res.data;
          this.setState({feed:response.feed,timeStamp:response.timeStamp})
        })
      axios.get(`/me`)
        .then(res => {
          const response = res.data;
          this.setState({name:response.details.name,timeStamp:response.timeStamp})
        })
    }

  render() {
    if(this.props.LogIn == true){
      return (
        <div className="Feed">
        <header className="App-header clearfix">
        <span className="User-name">Welcome, {this.state.name}  </span>
        <CreateFeed />
        <button className="btn right btn-default" type="submit" onClick={() => this.logOut()}> Log out </button>
        <span className="User-name dept-name"> {this.state.project}  </span>
        </header>

          <section className="Feed-wrapper">
          <header className="Feed-header">
          {this.state.feed}  {this.state.timeStamp}
          </header>

          <section className="Feed-description">
            <div className="img-placeholder"> </div>
          </section>

          <div className="Feed-comment">
          <input type="text" placeholder="Enter Your Comment" value={this.state.value} onChange={this.onChange.bind(this)} />
          </div>
          </section>
        </div>
      );
    }
    else return false;

  }
}

export default Feed;
