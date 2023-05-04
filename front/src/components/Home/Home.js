import React, { useState, useEffect } from "react";
import Forms from "../Forms/Forms";
import { getposts,getpostsBySearch } from "../../actions/Post";
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
import ChipInput from "material-ui-chip-input";
import { useNavigate, useLocation } from "react-router";
import Pagination from "../Pagination";
import { useDispatch } from "react-redux";
const Home = () => {
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  function useQuery() {
    return new window.URLSearchParams(window.location.search);
  }
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const query = useQuery();
  const page = query.get("page") || 1;
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
    dispatch(getpostsBySearch({  search: trimmedSearch, tags: tags.join(',') }));
    navigate(`/posts/search?searchQuery=${trimmedSearch}&tags=${tags.join(',')}`);
  } else if (trimmedSearch) {
    dispatch(getpostsBySearch({  search: trimmedSearch }));
    navigate(`/posts/search?searchQuery=${trimmedSearch}`);
  } else if (tags.length > 0) {
    dispatch(getpostsBySearch({ tags: tags.join(',') }));
    navigate(`/posts/search?tags=${tags.join(',')}`);
  } else {
    navigate('/');
  }
};

  
  return (
    <div>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={2}
          >
            <Grid xs={12}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <AppBar position="static" color="inherit">
              <TextField
                name="search"
                label="Search"
                variant="outlined"
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
                onAdd={handleAdd}
              />
            </AppBar>
            <Button variant="contained" color="primary" onClick={searchPost}>
              Search
            </Button>
            <Grid className="grid_form" xs={15}>
              <Forms currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            <Paper className="" elevation={6}>
              <Pagination page={page}/>
              
            </Paper>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
