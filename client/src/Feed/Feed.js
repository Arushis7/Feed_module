import React, { Component } from 'react';
import axios from 'axios';
import './Feed.css';

class Feed extends Component {
  constructor(props){
        super(props);
        this.state = {feed :"",timeStamp:"",value:""};

        this.onChange = (e) => {
        let newVal = e.target.value;
        this.setState({value:newVal});
        }
    }



    componentDidMount() {
      axios.get(`/feed`)
        .then(res => {
          const response = res.data;
          this.setState({feed:response.feed,timeStamp:response.timeStamp})
        })
    }


  render() {
    return (
      <div className="Feed">
        <header className="Feed-header">
        {this.state.feed}       {this.state.timeStamp}
        </header>

        <section className="Feed-description">
          <div className="img-placeholder"> </div>
        </section>

        <div className="Feed-comment"> <input type="text" placeholder="Enter Your Comment" value={this.state.value} onChange={this.onChange.bind(this)} />
        </div>

      </div>
      
    );
  }
}

export default Feed;
