import React from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import { useGoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
         Trying shit out.
        </p>
        <GoogleLogin
        clientId="730767729970-53dlt93l0rd60st2h9hdb3hslvbnh3el.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}/>
      </header>
    </div>
  );
}

export default App;
