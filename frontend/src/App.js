import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

import axios from "axios";
import Register from "./components/register/register";
import Login from "./components/login/Login";
import { createContext, useState } from "react";
import JobPost from "./components/jobPost/jobPost";
import Nav from "./components/NavBar/nav";
import Home from "./components/Home/Home";
import JobRender from "./components/JobRender/JobRender";
import Personal from "./components/PersonalPage/Personal";
import Filter from "./components/filter/Filter";
import Post from "./components/post/Post";

export const userContext = createContext();
function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userPersonal, setUserPersonal] = useState(() => {
    const storageUserPersonal = localStorage.getItem("user");
    try {
      return JSON.parse(storageUserPersonal) || {};
    } catch (error) {
      console.error("Error parsing userPersonal:", error);
      return {};
    }
  });
  const [post, setPost] = useState([]);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [skill, setSkill] = useState("");
  const [filter, setFilter] = useState("");
  const [job, setJob] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };
  return (
    <>
      <userContext.Provider
        value={{
          logout,
          setToken,
          token,
          isLoggedIn,
          setIsLoggedIn,
          setUserId,
          userId,
          userPersonal,
          setUserPersonal,
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
          post,
          setPost,
        }}
      >
        <div className="App">
          <Nav />
        </div>
        <Routes>
          <Route path="/home" element={<Filter />} />
          <Route path="/job" element={isLoggedIn ? <JobRender /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Post />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Personal /> : <Login />}
          />
          <Route path="/newJob" element={<JobPost />} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
