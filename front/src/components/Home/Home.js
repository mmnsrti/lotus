import React,{useState,useEffect} from 'react'
import Forms from '../Forms/Forms';
import {getpost} from '../../actions/Post'
import {Container , AppBar ,Typography , Grow ,Grid } from '@mui/material'
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
    dispatch(getpost())
    }, [currentId ,dispatch])
  return (
    <div>
       <Grow in>
          <Container>
            <Grid  container justifyContent="space-between" alignItems="stretch" spacing={2}>
              <Grid xs={12}>
                <Posts setCurrentId={setCurrentId}/>
              </Grid>
              <Grid className='grid_form' xs={15}>
                <Forms currentId={currentId} setCurrentId={setCurrentId}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
    </div>
  )
}

export default Home
