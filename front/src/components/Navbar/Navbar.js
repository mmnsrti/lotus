import React, { useState, useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@mui/material";
import lotus from "../../assets/lotus.png";
import "./navbar.css";
const Navbar = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  const handleLogout = () => {
    try {
      dispatch({ type: "LOGOUT" });
      alert("You have been successfully logged out.");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = user?.token
    
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className="appBar" position="static" color="inherit">
      <div className="">
        <Typography
          component={Link}
          to="/"
          className="heading"
          variant="h2"
          align="center"
        >
          Lotus
        </Typography>

        <img className="image" alt="Logo" src={lotus} />
      </div>
      <Toolbar>
        {user ? (
          <div className="">
            <Avatar
              className=""
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className="" variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" className="" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className=""
              component={Link}
              to="/auth"
              variant="contained"
            >
              Sign In
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
