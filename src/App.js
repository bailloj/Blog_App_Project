import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Media, Form, Button, Jumbotron, Image,Carousel, Card, ListGroup} from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import { getAllPosts, savePost } from './Server/API.js'
const ScrollArea = require('react-scrollbar');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.newSubmission = this.newSubmission.bind(this);
    this.state = {posts:[]};
  }

  //Add function to change state called by <Logging> (Get request)
  newSubmission(){
    let allPosts = getAllPosts();
    this.setState({posts:allPosts})
  }
  //Remember that parameters we pass into BlogPosts is state changed by get request
  
  render(){
    let listItems = [];
    if (this.state.posts.length==0){
      listItems =  <h1>No posts yet!</h1>
    }else{
      let i;
      for (i=0; i<this.state.posts.length; i++){
        console.log(this.state.posts[i])
        listItems.push(<Post {...this.state.posts[i]} key={i}/>)
      }
      console.log(listItems)
    }
    return (
        <Container fluid>
          <Row className="row justify-content-center">
            <Col>
              <h1 align="center" class="display-2">YUMMY</h1>
            </Col>
          </Row>

          <Row className="row justify-content-center">
            <Col sm={7}>
            <DessertImages/>
            </Col>
            <Col sm={5}>
              <ListGroup as ="ul">
               {listItems}
              </ListGroup>
            </Col>
          </Row>

          <Row className="row justify-content-center">
            <Col sm={{ span: 5, offset: 7}}>
              <Logging newSubmission={this.newSubmission}/>
            </Col>
          </Row>

        </Container>
    );
  }
}

//Post field and form for submit
class Postplatform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', title:''};
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeText(event) {
    this.setState({...this.state, value: event.target.value});
  }

  handleChangeTitle(event) {
    this.setState({...this.state, title: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let dateSubmitted = new Date()
    this.setState({value: '',title:''});
    //Called post function
    //savePost({title: this.state.title, name:this.props.name, date: dateSubmitted, imgsrc: this.props.imgsrc, body:this.state.value });
    //Call another function passed from parent to make get request & update parent state
    console.log(this.state);
    this.props.newSubmission();
  }

  render() {
    return (
      <Media>
        <img
          width={110}
          height={110}
          src={this.props.userDetails.imageUrl}
          alt="Generic placeholder"
        />
        <Media.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="Post">
              <Form.Control size="md" type="text" placeholder={"Title"} value={this.state.title} onChange={this.handleChangeTitle}/> 
              <Form.Control as="textarea" rows="3" placeholder={"Speak your truth " + this.props.userDetails.name}size="sm" value={this.state.value} onChange={this.handleChangeText}/>
            </Form.Group>
            <Button variant="primary" size="lg" type="submit" block>
              Post
            </Button>
          </Form>
        </Media.Body>
      </Media>
    );
  }
}


class Logging extends React.Component {
  constructor(props){
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLoginFail = this.handleLoginFail.bind(this);
    this.state = {isLoggedIn: false, userDetails:{}};
  }
  handleLoginClick(response) {
    //Take response, pass into state 
    let {profileObj} = response
    this.setState({isLoggedIn: true, userDetails: profileObj})
  }
  handleLoginFail(response){
    console.log(response);
  }
  render(){
    const isLoggedIn = this.state.isLoggedIn;
    let display;
    if(isLoggedIn){
      let userDetails= this.state.userDetails
      display = <Postplatform userDetails={userDetails} newSubmission={this.props.newSubmission}  />;
    }else {
      display = 
        <Card bg="primary">
          <GoogleLogin 
          clientId="730767729970-53dlt93l0rd60st2h9hdb3hslvbnh3el.apps.googleusercontent.com"
          onSuccess = {this.handleLoginClick}
          onFailure = {this.handleLoginFail}
        />
        </Card>
    }
    return(<div>
      {display}
    </div>)
  }

}

function DessertImages(props){
  return(
  <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://media.giphy.com/media/RwnoM2uvfwqcw/giphy.gif"
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://thumbs.gfycat.com/GiganticFinishedGalapagossealion-size_restricted.gif"
        alt="Third slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://media.giphy.com/media/RitWjMetRnEb84LCJB/giphy.gif"
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>
  )}




//Need to pass in user image, post text from blogPosts
function Post(props){
console.log(props)
return(
  <ListGroup.Item >
    <Media as="li" key={props.key}>
      <img
        width={110}
        height={110}
        src = {props.imgsrc}
        alt="Generic placeholder"
      />
      <Media.Body>
        <h5>{props.title}</h5>
        <h6>{props.name+props.date}</h6>
        <p>
          {props.body}
        </p>
      </Media.Body>
    </Media>
  </ListGroup.Item>
)}





/*
Log 
getPosts = () => {
  return 
}
*/
export default App;
