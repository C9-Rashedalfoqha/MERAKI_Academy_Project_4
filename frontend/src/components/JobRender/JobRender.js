import axios from "axios";
import React, { useEffect, useState } from "react";
import { userContext } from "../../App";
import { useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const JobRender = () => {
  const {
    setToken,
    token,
    userId,
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
  const [dashBoard, setDashBoard] = useState([]);
  const [comment, setComment] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/job")
      .then((result) => {
        console.log(result);
        setDashBoard(result.data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {dashBoard.map((elem) => (
          <Grid item xs={12} key={elem._id}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6">
                {elem.userId.FirstName} {elem.userId.lastName}
                <img src={elem.photo} alt={elem.photo} />
                <h3>{elem.title}</h3>
                <p>{elem.jobAddress}</p>
                <p>{elem.salary}</p>
                <p>{elem.description}</p>
              </Typography>
              <div>
                {elem.comment.map((elem) => (
                  <Typography key={elem._id} variant="body1">
                    {elem.comment}
                  </Typography>
                ))}
              </div>
              <TextField
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={() => {
                  axios
                    .post(
                      `http://localhost:5000/job/${elem._id}/comments/`,
                      {
                        comment: comment,
                      },
                      {
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((result) => {
                      console.log(result);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Comment
              </Button>
              {elem.userId._id === userId && (
                <>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      axios
                        .delete(
                          `http://localhost:5000/job/delete/${elem._id}`,
                          {
                            headers: {
                              authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((result) => {
                          console.log(result);
                        })
                        .catch((err) => {
                          console.log(err.message);
                        });
                    }}
                  >
                    Delete
                  </Button>
                  {update && (
                    <>
                      <TextField
                        type="text"
                        placeholder="Edit Job Title"
                        onChange={(e) => setJob(e.target.value)}
                        fullWidth
                      />
                      <TextField
                        type="text"
                        placeholder="Edit Job Address"
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                      />
                      <TextField
                        type="text"
                        placeholder="Edit Job Description"
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                      />
                    </>
                  )}
                  <Button
                    variant="contained"
                    onClick={() => {
                      axios
                        .put(
                          `http://localhost:5000/job/update/${elem._id}`,
                          {
                            title: job,
                            jobAddress: address,
                            description: description,
                          },
                          {
                            headers: {
                              authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((result) => {
                          console.log(result);
                          setUpdate(true);
                        })
                        .catch((err) => {
                          console.log(err.message);
                        });
                    }}
                  >
                    Update
                  </Button>
                </>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobRender;
