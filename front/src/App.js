import React from 'react'

import {Container} from '@mui/material'

import Home from './components/Home/Home'

import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Route, Switch , Routes} from 'react-router-dom';
import  './styles.css';
function App() {

  return (
    <Router>
       
        <Container maxWidth='lg'>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/auth" element={<Auth />} />
          </Routes>
          
        </Container>
      
    </Router>
  );
}

export default App;
 