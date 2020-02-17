import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Media from 'react-bootstrap/Media'
import { GoogleLogin } from 'react-google-login';
//import { getPosts } from './Server/API.js'

/*<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>*/



function App() {
  
  return (
    <div className="App">
         Trying it out.
         <Logging />
    </div>
  );
}


//let {profileObj} = response
// console.log("Logged out!");

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
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Post:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class Logging extends React.Component {
  constructor(props){
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLoginFail = this.handleLoginFail.bind(this);
    this.state = {isLoggedIn: false};
  }
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  handleLoginFail(response){
    console.log(response);
  }
  render(){
    const isLoggedIn = this.state.isLoggedIn;
    let display;
    if(isLoggedIn){
      display = <Postplatform />;
    }else {
      display = <GoogleLogin 
      clientId="730767729970-53dlt93l0rd60st2h9hdb3hslvbnh3el.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess = {this.handleLoginClick}
      onFailure = {this.handleLoginFail}
      />
    }
    return(<div>
      {display}
    </div>)
  }


}




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
