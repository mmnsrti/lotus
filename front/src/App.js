import React from 'react'
import './App.css';
import {Container , AppBar ,Typography , Grow ,Grid } from '@mui/material'
import lotus from './assets/lotus.png'
import Forms from './components/Forms/Forms';
import Posts from './components/Posts/Posts';
function App() {
  return (
    <div className="App">
      <Container maxWidth='lg'>
        <AppBar position='static' color='inherit'>
          <Typography variant='h2' align='center'>Lotus</Typography>
          <img alt='Logo' src={lotus}/>
        </AppBar>
        <Grow in>
          <Container>
            <Grid  container justifyContent="space-between" alignItems="stretch" spacing={2}>
              <Grid xs={12} sm={7}>
                <Posts/>
              </Grid>
              <Grid xs={12} sm={4}>
                <Forms/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}

export default App;
