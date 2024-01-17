import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { PiWarningCircleFill } from "react-icons/pi";
import { IoIosContact } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { userContext } from "../../App";

const Nav = () => {
  const { logout } = useContext(userContext);
  return (
    <AppBar position="static" color="inherit" className="marg">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className="nav-link">
            <AiFillHome className="home" />
          </Link>
        </Typography>
        <Button color="inherit" to="/newJob"></Button>

        <Button color="inherit">
          <PiWarningCircleFill className="con" />
        </Button>
        <Button color="inherit">
          <Link to="/job">
            {" "}
            <FaMessage className="con" />
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/login">
            <IoIosContact className="con" />
          </Link>
        </Button>
        <Button
          onClick={() => {
            logout()
          }}
        >
          {" "}
          <RiLogoutCircleRLine />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
