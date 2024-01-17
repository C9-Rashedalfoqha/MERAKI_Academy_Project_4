import axios from "axios";
import React, { useContext, useEffect } from "react";
import { userContext } from "../../App";

const User = () => {
  const [user, setUser] = useState([]);
  const { UserDetail, setUserDetail } = useContext(userContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${UserDetail}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setUser(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>User</div>;
};

export default User;
