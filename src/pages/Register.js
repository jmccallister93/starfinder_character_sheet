import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const validatePassword = (password) => {
    // Assuming you require at least 6 characters as mentioned in the Supabase settings
    return password.length >= 6;
  };

  const validateEmail = (email) => {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const register = () => {
    if (!validatePassword(registerPassword) || !validateEmail(registerEmail)) {
      setErrorMsg("Invalid email or password");
      return;
    }

    axios({
      method: "POST",
      data: {
        email: registerEmail,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/register",
    })
      .then((res) => {
        setErrorMsg("");
        setSuccessMsg("Registration successful. A verification email has been sent to you.");
        console.log(res);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setErrorMsg(err.response.data);
        }
      });
  };

  return (
    <>
      <div>
        <h1>Register</h1>
        <input
          placeholder="email"
          type="email"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <p>Password should be at least 6 characters.</p>
        <button onClick={register}>Submit</button>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}
      </div>
    </>
  );
};

export default Register;
