import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../post/post.css";

const Post = () => {
  const { token, post, setPost, userId } = useContext(userContext);
  const [comment, setComment] = useState("");
  const [update, setUpdate] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/post/get", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        setPost(result.data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 mx-auto mb-8">
            <div className="card">
              <div className="card-header">
                <input
                  className="inp-des"
                  placeholder="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <input
                  type="file"
                  id="inp"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                {image && (
                  <button onClick={image && uploadImage}>Upload</button>
                )}
                <Button
                  onClick={() => {
                    axios.post(
                      "http://localhost:5000/post",
                      {
                        description: description,
                        photo: url,
                      },
                      {
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      }
                    );
                  }}
                >
                  create post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button className="btn-" variant="outline-success" />
      <div className="container mt-5">
        <div className="row">
          {post.map((elem) => (
            <div className="col-md-8 mx-auto mb-4" key={elem._id}>
              <div className="card">
                <div className="card-header">
                  <img
                    src={elem.userId.photo}
                    alt={elem.userId.FirstName}
                    className="rounded-circle mr-2"
                    width="40"
                    height="40"
                  />

                  <Link to={`/personal`}></Link>
                </div>
                <img src={elem.photo} className="card-img-top" alt="Post" />
                <div className="card-body">
                  <p className="card-text">{elem.description}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-secondary mr-2">
                    <IoSend /> Comment
                  </button>
                </div>
                {elem.userId._id === userId && (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        axios
                          .delete(
                            `http://localhost:5000/post/delete/${elem._id}`,
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
                    {update ? (
                      <>
                        <Button
                          variant="contained"
                          onClick={() => {
                            axios
                              .put(
                                `http://localhost:5000/post/update/${elem._id}`,
                                {
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
                                setDescription(result.data.posts);
                              })
                              .catch((err) => {
                                console.log(err.message);
                              });
                          }}
                        >
                          Update
                        </Button>
                        <input
                          type="text"
                          placeholder="Edit Job Description"
                          onChange={(e) => setDescription(e.target.value)}
                          fullWidth
                        />
                      </>
                    ) : (
                      <>
                        {" "}
                        <Button
                          onClick={() => {
                            setUpdate(!update);
                          }}
                        >
                          update description
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;
