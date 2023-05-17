import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Container,
  AppBar,
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
  Avatar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import ChipInput from "material-ui-chip-input";

import lotus from "../../assets/lotus.png";
import decode from "jwt-decode";
import { getposts, getpostsBySearch } from "../../actions/Post";

import Darkmode from "../Posts/Post/Darkmode";
import Forms from "../Forms/Forms";
import "./navbar.css";
const Navbar = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  const [search, setSearch] = useState("");
  function useQuery() {
    return new window.URLSearchParams(window.location.search);
  }

  const [tags, setTags] = useState([]);

  const query = useQuery();
  const SearchQuery = query.get("searchQuery");
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const searchQuery = query.get("searchQuery");
      if (searchQuery) {
        navigate(`/search/${searchQuery}`);
      }
    }
  };
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  const searchPost = () => {
    const trimmedSearch = search.trim();

    if (trimmedSearch && tags.length > 0) {
      dispatch(
        getpostsBySearch({ search: trimmedSearch, tags: tags.join(",") })
      );
      navigate(
        `/posts/search?searchQuery=${trimmedSearch}&tags=${tags.join(",")}`
      );
    } else if (trimmedSearch) {
      dispatch(getpostsBySearch({ search: trimmedSearch }));
      navigate(`/posts/search?searchQuery=${trimmedSearch}`);
    } else if (tags.length > 0) {
      dispatch(getpostsBySearch({ tags: tags.join(",") }));
      navigate(`/posts/search?tags=${tags.join(",")}`);
    } else {
      navigate("/");
    }
  };
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
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 <= new Date().getTime()) handleLogout();
      setUser(JSON.parse(localStorage.getItem("profile")));
    }
  }, [location]);
  return (
    <div className="appBar" position="static" color="inherit">
      <div className="appBar-Navbar">
        <Darkmode className="dark-mode" />
        <div color="inherit" className="searchfiel">
          <TextField
            name="search"
            label="Search"
            variant="outlined"
            value={search}
            onKeyPress={handleKeyPress}
            onChange={(e) => setSearch(e.target.value)}
            className="searchfield"
          />
          <ChipInput
            style={{ margin: "1px 0" }}
            value={tags}
            onDelete={handleDelete}
            label="Search Tags" 
            variant="outlined"
            className="ChipInput"
            onAdd={handleAdd}
          />
          <button class="my-search-button"
                  variant="contained"
                  onClick={searchPost}
          >
            Search
          </button>
          
        </div>
        <a href="/" className="heading">
          Lotus
        </a>
      </div>
      <Toolbar>
        {user ? (
          <div className="avatar-Navbar">
            <Avatar
              className="avatar"
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className="name" variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className="create-Navbar"
              component={Link}
              to="/create"
              setCurrentId={setCurrentId}
              currentId={currentId}
            >
              create
            </Button>
            <Button
              variant="contained"
              className="LogOut-Navbar"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className="SignIn-Navbar"
              component={Link}
              to="/auth"
              variant="contained"
            >
              Sign In
            </Button>
          </div>
        )}
        <a href="/">
          <img className="logo" alt="Logo" src={lotus} />
        </a>
      </Toolbar>
    </div>
  );
};

export default Navbar;
