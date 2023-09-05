import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:YOUR_SERVER_PORT/register",
    }).then((res) => console.log(res));
  };

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:YOUR_SERVER_PORT/login",
    }).then((res) => console.log(res));
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)}/>
        <input placeholder="password" type="password" onChange={e => setRegisterPassword(e.target.value)}/>
        <button onClick={register}>Submit</button>
      </div>
      <div>
        <h1>Login</h1>
        <input placeholder="username" onChange={e => setLoginUsername(e.target.value)}/>
        <input placeholder="password" type="password" onChange={e => setLoginPassword(e.target.value)}/>
        <button onClick={login}>Submit</button>
      </div>
    </div>
  );
}

export default App;
