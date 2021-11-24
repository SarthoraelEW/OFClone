import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  let navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const usernameError = document.querySelector(".username.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/register`,
      data: {
        username,
        email,
        password
      },
    })
      .then((res) => {
        if (res.data.errors) {
          usernameError.innerHTML = res.data.errors.username;
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          navigate('/login');
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="register-page">
      <div className="right">
        <h1>OFClone</h1>
        <h2>Sign up to support your favorite creators</h2>
      </div>
      <div className="left">
        <div className="log-container">
          <form action="" onSubmit={handleRegister} id="sign-in-form">
            <label htmlFor="Register">Create your account</label>
            <br />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <div className="username error"></div>
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
          <h6>Already have an account? <Link to="/register">Login</Link></h6>
        </div>
      </div>
    </div>
  );
};

export default Register;