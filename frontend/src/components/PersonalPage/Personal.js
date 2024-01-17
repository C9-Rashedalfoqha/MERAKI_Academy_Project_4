import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Personal = () => {
  const [update, setUpdate] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const {
    userPersonal,
    setUserPersonal,
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
    token,
  } = useContext(userContext);

  useEffect(() => {
    if (update) {
      updateData();
    }
  }, [update]);

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wq8dmxe2");
    data.append("cloud_name", "duanrnkmq");

    axios
      .post(`https://api.cloudinary.com/v1_1/duanrnkmq/image/upload`, data)
      .then((response) => {
        setUrl(response.data.url);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const updateData = () => {
    axios
      .put(
        `http://localhost:5000/register/update/${userPersonal._id}`,
        {
          FirstName: first,
          lastName: last,
          Email: email,
          password: password,
          phoneNumber: phoneNumber,
          Experience: experience,
          Skills: skill,
          photo: url,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setUserPersonal({ ...userPersonal, ...result.data.result });
        console.log(result);
        uploadImage();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container">
      {" "}
      <Container>
        <Row className="justify-content-center mt-4">
          <Col md={6}>
            <div className="parent-per">
              {update ? (
                <>
                  <div className="form-group mt-2">
                    <Avatar
                      alt="User"
                      src={userPersonal.photo}
                      className="avatar"
                    />
                    <input
                      type="file"
                      id="inp-img"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                    {image && (
                      <button onClick={image && uploadImage}>Upload</button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group mt-2">
                    <Avatar alt="User" src={userPersonal.photo} />
                  </div>
                </>
              )}
              {update ? (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      First Name:
                    </label>
                    <TextField
                      className="form-control"
                      label="First Name"
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      First Name:
                    </label>
                    <p className="per">{userPersonal.FirstName}</p>
                  </div>
                </>
              )}
              {update ? (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      Last Name:
                    </label>
                    <TextField
                      className="form-control"
                      label="Last Name"
                      value={last}
                      onChange={(e) => setLast(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      Last Name:
                    </label>
                    <p className="per">{userPersonal.lastName}</p>
                  </div>
                </>
              )}
              {update ? (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      Email:
                    </label>
                    <TextField
                      className="form-control"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      Email:
                    </label>
                    <p className="per">{userPersonal.Email}</p>
                  </div>
                </>
              )}

              {update ? (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      Phone Number:
                    </label>
                    <TextField
                      className="form-control"
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      Phone Number:
                    </label>
                    <p className="per">{userPersonal.phoneNumber}</p>
                  </div>
                </>
              )}

              {update ? (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      Experience:
                    </label>
                    <TextField
                      className="form-control"
                      label="Experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      Experience:
                    </label>
                    <p className="per">{userPersonal.Experience}</p>
                  </div>
                </>
              )}

              {update ? (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      Skills:
                    </label>
                    <TextField
                      className="form-control"
                      label="Skills"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group mt-2">
                    <label className="field-label font-weight-bold">
                      Skills:
                    </label>
                    <p className="per">{userPersonal.Skills}</p>
                  </div>
                </>
              )}
              {update ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    updateData();
                    setUpdate(!update);
                  }}
                  className="mt-3"
                >
                  Update user information
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setUpdate(!update)}
                  className="mt-3"
                >
                  Edit information
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
     
    </div>
  );
};

export default Personal;
