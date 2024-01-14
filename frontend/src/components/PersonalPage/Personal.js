import React, { useContext } from "react";
import { userContext } from "../../App";

const Personal = () => {
  const { userPersonal, setUserPersonal } = useContext(userContext);
  console.log(userPersonal);
  return (
    <div>
      {userPersonal.FirstName}
      {userPersonal.lastName}
      {userPersonal.Email}
      {userPersonal.phoneNumber}
      {userPersonal.Experience}
      {userPersonal.Skills}
    </div>
  );
};

export default Personal;
