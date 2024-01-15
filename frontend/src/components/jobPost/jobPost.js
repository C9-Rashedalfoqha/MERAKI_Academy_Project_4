import axios from "axios";
import React, { useState } from "react";
import "./jobPost.css";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { userContext } from "../../App";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const JobPost = () => {
  const navigate = useNavigate();
  const {
    setToken,
    token,
    filter,
    setFilter,
    job,
    setJob,
    address,
    setAddress,
    description,
    setDescription,
    salary,
    setSalary,
    image,
    setImage,
    url,
    setUrl,
  } = useContext(userContext);
  const uploadImage = () => {
    console.log(image);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wq8dmxe2");
    data.append("cloud_name", "duanrnkmq");
    axios
      .post(`https://api.cloudinary.com/v1_1/duanrnkmq/image/upload`, data)
      .then((data) => {
        setUrl(data.data.url);
        // console.log(url);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="job">
      <InputGroup></InputGroup>

      <Form.Label>filter</Form.Label>
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option value="1">dev</option>
        <option value="2">dev</option>
        <option value="3">dev</option>
        <option value="4">dev</option>
        <option value="5">dev</option>
        <option value="6">dev</option>
      </Form.Select>

      <Form.Label>Job Name</Form.Label>
      <input
        id="inp"
        placeholder="Job Name"
        type="text"
        className="inp"
        onChange={(e) => {
          setJob(e.target.value);
        }}
      />

      <Form.Label>Job Address</Form.Label>
      <input
        id="inp"
        placeholder="Job Address"
        type="text"
        className="inp"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />

      <Form.Label>salary</Form.Label>
      <input
        id="inp"
        placeholder="salary"
        type="number"
        className="inp"
        onChange={(e) => {
          setSalary(e.target.value);
        }}
      />

      <Form.Label>Description</Form.Label>
      <input
        id="inp"
        placeholder="Description"
        type="text"
        className="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="file"
        id="inp"
        onChange={(e) => {
          setImage(e.target.files[0]);

          // console.log(e.target.files);
        }}
      />

      {image && <button onClick={image && uploadImage}>Upload</button>}

      <img src={url} />
      <Button
        className="btn-"
        variant="outline-success"
        onClick={() => {
          axios
            .post(
              "http://localhost:5000/job",
              {
                filterTitle: filter,
                title: job,
                jobAddress: address,
                description: address,
                salary: salary,
                photo: url,
              },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
            .then((result) => {
              console.log(result);
              navigate("/job");
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        created new job
      </Button>
    </div>
  );
};

export default JobPost;
