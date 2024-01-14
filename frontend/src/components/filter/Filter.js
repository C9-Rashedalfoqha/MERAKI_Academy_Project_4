import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const [category, setCategory] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:5000/job")
      .then((result) => {
        console.log(result);
        setCategory(result.data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      <>
        {category.map((elem) => {
          return (
            <>
              <p
                
              >
                <img src="https://images.pexels.com/photos/12225078/pexels-photo-12225078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" onClick={() => {
                    console.log(elem._id);
                    navigate("/dev")
                }}/>
                {elem.filterTitle}
              </p>
            </>
          );
        })}
      </>
    </div>
  );
};

export default Filter;
