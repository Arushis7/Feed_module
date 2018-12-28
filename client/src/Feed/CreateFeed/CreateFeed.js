import React, { Component } from 'react';
import { Appbar, Button, Container } from 'muicss/react';
import Textarea from 'muicss/lib/react/textarea';
import {Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Input } from 'reactstrap';
// import {  } from 'reactstrap';
import axios from 'axios';
import './CreateFeed.css';

class CreateFeed extends Component {
  constructor(props){
        super(props);
        console.log(props);
        this.state = {feed:"",modal: false}

        this.toggle = this.toggle.bind(this);
        this.textInput = React.createRef();
    }

    setFeed = (e)=> {
      var val = e.target.value;
      this.setState({
        feed: val
      })
    }

    toggle() {
    this.setState({
      modal: !this.state.modal
    })};

    addFeed(){
      var payload = {feed:this.state.feed};
      // axios.get(`/me`)
      //   .then(res => {
      //     const response = res.data;
      //     this.setState({name:res.data.name,project:res.data.project})
      //   })

      axios({
         method: 'post',
         url: '/createFeed',
         data: payload
       }).then(function (response) {
         console.log(response);
          if(response.data.Error){
          //  console.log('error');
          console.log(response);
          }
          else{
            this.setState({
              modal: !this.state.modal
            })
            console.log(response.data)
          }
        })
    }

    render(){
      return(
      <div className="feed-popup">
      <Button className="btn right btn-default" color="primary" onClick={this.toggle}>create Feed</Button>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
         <FormGroup>
        <Input placeholder="Enter Feed text" onChange={this.setFeed}  value={this.state.feed} type="textarea" name="text" id="exampleText" />
         </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>this.addFeed()}> Create Feed </Button>
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
      )
    }
}

export default CreateFeed;
