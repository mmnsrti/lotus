import React from "react";

import { Container } from "@mui/material";

import Home from "./components/Home/Home";
import Forms from "./components/Forms/Forms";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  Navigate,
} from "react-router-dom";
import PostDetailed from './components/PostDetailed/PostDetailed'
import "./styles.css";
function App() {
  const user =JSON.parse(localStorage.getItem('profile'))
 
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts/search" exact element={<Home/> } />
          <Route exact path="/posts" element={<Home/>} />
          <Route exact path="/auth" element={user ? <Navigate to='/posts' /> : <Auth />} />
          <Route path="/posts/:id" element={<PostDetailed/> } />
          <Route exact path="/create" element={<Forms />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
