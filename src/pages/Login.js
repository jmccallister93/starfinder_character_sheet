import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state variable
  const navigate = useNavigate();


  const login = async () => {
    try {
      const res = await axios({
        method: "POST",
        data: {
          email: loginEmail,
          password: loginPassword,
        },
        withCredentials: true,
        url: "http://localhost:3001/login",
      });
  
      // If this line executes, the call was successful
      console.log(res);
  
      setIsAuthenticated(true);
      setErrorMsg("");
      if (res.status === 200) {
        console.log('Login successful');
        navigate('/');
      }
    } catch (err) {
      // If this block executes, the call failed
      console.log("Axios error:", err);
      setIsAuthenticated(false);
      if (err.response && err.response.data) {
        setErrorMsg(err.response.data);
      }
    }
  };
  

  return (
    <>
      <div>
        <h1>Login</h1>
        <input
          placeholder="email"
          type="email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {isAuthenticated && <p className="success-message">Login successful!</p>} {/* New line */}
      </div>
    </>
  );
};

export default Login;
