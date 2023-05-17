import React, { useState } from "react";

import { Container } from "@mui/material";

import Home from "./components/Home/Home";
import Forms from "./components/Forms/Forms";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Footer from "./components/Footer/Footer";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  Navigate,
} from "react-router-dom";
import PostDetailed from "./components/PostDetailed/PostDetailed";
import "./styles.css";
function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentId, setCurrentId] = useState(null);

  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar currentId={currentId} setCurrentId={setCurrentId} />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route
            path="/posts/search"
            exact
            element={<Home currentId={currentId} setCurrentId={setCurrentId} />}
          />
          <Route
            exact
            path="/posts"
            element={<Home currentId={currentId} setCurrentId={setCurrentId} />}
          />
          <Route
            exact
            path="/auth"
            element={user ? <Navigate to="/posts" /> : <Auth />}
          />
          <Route path="/posts/:id" element={<PostDetailed />} />
          <Route
            exact
            path="/create"
            element={
              <Forms setCurrentId={setCurrentId} currentId={currentId} />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
