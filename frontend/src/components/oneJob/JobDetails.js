import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { userContext } from "../../App";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoSendSharp } from "react-icons/io5";

const JobDetails = () => {
  const { JobDetail, token } = useContext(userContext);
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/job/${JobDetail}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setJobDetails(result.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch job details");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Job Details</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          {jobDetails.photo ? (
            <img src={jobDetails.photo} />
          ) : (
            <img src="https://images.pexels.com/photos/4439454/pexels-photo-4439454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          )}
          <p>Title: {jobDetails.title}</p>
          <p>Address: {jobDetails.jobAddress}</p>
          <p>Salary: {jobDetails.salary}</p>
          <p>Description: {jobDetails.description}</p>

          <div>
            <h3>Comments:</h3>
            {jobDetails.comment.map((elem) => (
              <div key={elem._id}>
                <p>{elem.comment}</p>
              </div>
            ))}
          </div>

          <TextField
            placeholder="Comment"
            onChange={(e) => setComment(e.target.value)}
            fullWidth
          />
          <div className="comment">
            <Button
              variant="contained"
              onClick={() => {
                axios
                  .post(
                    `http://localhost:5000/job/${JobDetail}/comments/`,
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
                    setJobDetails({
                      ...jobDetails,
                      comment: [
                        ...jobDetails.comment,
                        {
                          comment: comment,
                        },
                      ],
                    });
                    setComment("");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <IoSendSharp />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobDetails;
