import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../register/register.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { userContext } from "../../App";

const Register = () => {
  const navigate = useNavigate();
  const {
    first,
    setFirst,
    last,
    setLast,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    experience,
    setExperience,
    skill,
    setSkill,
  } = useContext(userContext);

  return (
    <div className="register">
      <br />
      <Form>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            onChange={(e) => setFirst(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            onChange={(e) => setLast(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formExperience">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your experience"
            onChange={(e) => setExperience(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSkills">
          <Form.Label>Skills & Qualifications</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your skills & qualifications"
            onChange={(e) => setSkill(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={() => {
            axios
              .post("http://localhost:5000/register", {
                FirstName: first,
                lastName: last,
                Email: email,
                password: password,
                phoneNumber: phoneNumber,
                Experience: experience,
                Skills: skill,
              })
              .then((result) => {
                console.log(result.data);
                navigate("/login");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
