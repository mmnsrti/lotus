import React, { useState, useEffect } from "react";
import Forms from "../Forms/Forms";
import { getposts, getpostsBySearch } from "../../actions/Post";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import Posts from "../Posts/Posts";
import Pagination from "../Pagination";
import { useDispatch } from "react-redux";
import "./home.css";
const Home = ({ currentId, setCurrentId }) => {
  function useQuery() {
    return new window.URLSearchParams(window.location.search);
  }
  const query = useQuery();

  const page = query.get("page") || 1;

  return (
    <div className="home">
      <Grow in>
        <div>
          <div
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={2}
            className="Grid-home"
          >
            <div xs={2}>
              <Posts setCurrentId={setCurrentId} className="home-posts" />
            </div>

            <div className="paper" elevation={6}>
              <Pagination className="Pagination" page={page} />
            </div>
          </div>
        </div>
      </Grow>
    </div>
  );
};

export default Home;
