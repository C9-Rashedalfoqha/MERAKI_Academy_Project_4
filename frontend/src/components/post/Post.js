import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../post/post.css";

const Post = () => {
  const { token, post, setPost, userId, userPersonal } =
    useContext(userContext);
  const [comment, setComment] = useState("");
  const [update, setUpdate] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [filter, setFilter] = useState("");
  const uploadImage = () => {
    // console.log(image);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wq8dmxe2");
    data.append("cloud_name", "duanrnkmq");
    axios
      .post(`https://api.cloudinary.com/v1_1/duanrnkmq/image/upload`, data)
      .then((data) => {
        setUrl(data.data.url);
        console.log("uploaded");
        // console.log(url);
        // console.log(data);
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
        setPost(result.data.posts);
        setFilter(result.data.posts._id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(userPersonal);

  return (
    <>
      <div className="user">
        <div className="info">
          <img
            src={userPersonal.photo}
            alt={userPersonal.FirstName}
            className="rounded-circle mr-2"
            width="100"
            height="100"
          />
          <p>----------------------------</p>
          <p>
            {userPersonal.FirstName} {userPersonal.lastName}
          </p>
        </div>
      </div>
      <div className="post-form">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8 mx-auto mb-6">
              <div className="card">
                <div className="card-header">
                  <input
                    className="inp-des"
                    placeholder="description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="file"
                    id="inp-img"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                  <br />

                  {image && (
                    <button onClick={image && uploadImage}>Upload</button>
                  )}
                  <Button
                    className="create"
                    onClick={() => {
                      axios
                        .post(
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
                        )
                        .then((result) => {
                          setPost([...post, result.data.post]);
                          console.log(result);
                        });
                    }}
                  >
                    Create Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row" id="row">
            {post &&
              post.map((elem, i) => (
                <div className="col-md-8 mx-auto mb-6" key={elem._id}>
                  <div className="card">
                    <div className="card-header">
                      <img
                        src={elem?.userId?.photo}
                        alt={elem?.userId?.FirstName}
                        className="rounded-circle mr-2"
                        width="40"
                        height="40"
                      />
                      <p>
                        {elem?.userId?.FirstName} {elem?.userId?.lastName}
                      </p>
                    </div>
                    
                      {" "}
                      <img
                        src={elem?.photo}
                        className="card-img-top"
                        alt="Post"
                        width="100"
                        height="300"
                      />
                    
                    <div className="card-body">
                      <p className="card-text">{elem?.description}</p>
                    </div>
                    <div className="card-footer">
                      <input
                        placeholder="Comment"
                        type="text"
                        required
                        className="inp-comment"
                        onClick={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                      <button
                        className="btn btn-secondary mr-2"
                        onClick={() => {
                          axios
                            .post(
                              `http://localhost:5000/post/${elem._id}/comments/`,
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
                              const updatedPost = post.map((element) =>
                                element._id === elem._id
                                  ? {
                                      ...element,
                                      comment: [
                                        ...element.comment,
                                        {
                                          comment: comment,
                                        },
                                      ],
                                    }
                                  : element
                              );
                              setPost(updatedPost);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
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
                                const filteredPost = post.filter(
                                  (element, i) => {
                                    return elem._id != element._id;
                                  }
                                );
                                setPost(filteredPost);
                                console.log(filteredPost);
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
                                    setUpdate(!update);

                                    const filteredPost = post.filter(
                                      (element, i) => {
                                        return (
                                          elem._description ===
                                          element.description
                                        );
                                      }
                                    );
                                    setDescription(filteredPost);
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
      </div>
    </>
  );
};

export default Post;
