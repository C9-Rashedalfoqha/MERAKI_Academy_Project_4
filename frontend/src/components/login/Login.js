import axios from "axios";
import React, { useState } from "react";
import { userContext } from "../../App";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GoogleLogin } from "@react-oauth/google";
import "../login/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    setToken,
    token,
    isLoggedIn,
    setIsLoggedIn,
    setUserId,
    userId,
    userPersonal,
    setUserPersonal,
  } = useContext(userContext);
  const navigate = useNavigate();
  return (
    <Form className="login">
      {" "}
      <br />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label> <br />
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </Form.Group>
      <br />
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>password</Form.Label> <br />
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </Form.Group>
      <GoogleOAuthProvider
        className="google"
        clientId="308002675488-atob5tp4gc8ialafed71dh26sdqmh2ur.apps.googleusercontent.com"
      >
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            setToken(credentialResponse.credential);
            localStorage.setItem("token", token);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        ;
      </GoogleOAuthProvider>
      <br />
      <Link to="/register">
        <p>register </p>
      </Link>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          axios
            .post("http://localhost:5000/register/login", {
              Email: email,
              password: password,
            })
            .then((result) => {
              console.log(result);
              const token = result.data.token;
              localStorage.setItem("token", token);
              setToken(token);
              localStorage.setItem("userId", result.data.userId);
              setUserId(result.data.userId);
              localStorage.setItem("user", JSON.stringify(result.data.user));
              setUserPersonal(result.data.user);
              navigate("/");
            })
            .catch((err) => {
              console.log(err.message);
            });
        }}
      >
        {" "}
        Submit
      </Button>
      
    </Form>
  );
};

export default Login;
