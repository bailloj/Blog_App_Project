import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Media, Form, Button, Jumbotron, Image,Carousel} from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
//import { getPosts } from './Server/API.js'

/*<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>*/

  /*<Col sm={4}>
          <Image src="https://community.breatheheavy.com/wp-content/uploads/2020/01/justin-bieber-yummy-charts-1024x399.jpg" thumbnail/>
          </Col>*/

function App() {
  
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
            <h1>temp heading for posts</h1>
          </Col>
        </Row>
        <Row className="row justify-content-center">
          <Col sm={{ span: 5, offset: 7}}>
            <Logging />
          </Col>
        </Row>

      </Container>
  );
}




class Postplatform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.value)
    this.setState({value: ''});
    // PUT POST REQUEST HERE
  }

  render() {
    return (
      <Media>
        <img
          width={110}
          height={110}
          className="user-image"
          src={this.props.imageUrl}
          alt="Generic placeholder"
        />
        <Media.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="Post">
              <Form.Control as="textarea" rows="3" placeholder={"What's on your mind " + this.props.name +"?"}size="lg" value={this.state.value} onChange={this.handleChange}/>
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
    console.log(this.state.userDetails)
  }
  handleLoginFail(response){
    console.log(response);
  }
  render(){
    const isLoggedIn = this.state.isLoggedIn;
    let display;
    if(isLoggedIn){
      let userDetails= this.state.userDetails
      console.log(userDetails)
      display = <Postplatform {...userDetails}/>;
    }else {
      display = 
      <Container>
      <h5>say something</h5>
      <GoogleLogin 
      clientId="730767729970-53dlt93l0rd60st2h9hdb3hslvbnh3el.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess = {this.handleLoginClick}
      onFailure = {this.handleLoginFail}
      />
      </Container>
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


/*
//Need to pass in user image, post text from blogPosts
function post(props){
return <Media as="li">
  <img
    width={64}
    height={64}
    src = {props.userImage}
  />
  <Media.Body>
    <p>
      {props.text}
    </p>
  </Media.Body>
</Media>
}

function blogPosts(props){
let postArrays = getPosts();
const allBlogPosts = postArrays.map((p)=><post {...p} />)
}

Log 
getPosts = () => {
  return 
}
*/
export default App;
