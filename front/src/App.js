import React from 'react'

import {Container , AppBar ,Typography , Grow ,Grid } from '@mui/material'
import lotus from './assets/lotus.png'
import Forms from './components/Forms/Forms';
import Posts from './components/Posts/Posts';
import  './styles.css';
function App() {
  
  return (
    <div className="App">
      <Container maxWidth='lg'>
        <AppBar className='appBar' position='static' color='inherit'>
          <Typography className='heading' variant='h2' align='center'>Lotus</Typography>
          <img className='image' alt='Logo' src={lotus} />
        </AppBar>
        <Grow in>
          <Container>
            <Grid  container justifyContent="space-between" alignItems="stretch" spacing={2}>
              <Grid xs={12}>
                <Posts/>
              </Grid>
              <Grid xs={12}>
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
