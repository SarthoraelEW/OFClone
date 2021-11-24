import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios
      .post(
        process.env.REACT_APP_API_URL + "api/user/login",
        { email: email, password: password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      });
  };

  return (
    <div className="login-page">
      <div className="right">
        <h1>OFClone</h1>
        <h2>Sign up to support your favorite creators</h2>
      </div>
      <div className="left">
        <div className="log-container">
          <form action="" onSubmit={handleLogin} id="sign-in-form">
            <label htmlFor="Log in">Log in</label>
            <br />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="email error"></div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="password error"></div>
            <input type="submit" value="Login" />
            <br />
            <div className="separator" />
          </form>
          <Link to="/register">Sign up for OFClone</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
