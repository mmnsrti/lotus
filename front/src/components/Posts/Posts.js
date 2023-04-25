import React from 'react'
import Post from './Post/Post'
import {Grid , CircularProgress} from '@mui/material'
import { useSelector } from 'react-redux'

import './posts.css'
const Posts = ({setCurrentId}) => {
  const posts = useSelector((state) => state.posts);

  return (
    !posts.length ? <CircularProgress/> :(
      <Grid className= '' container alignItems='stretch' spacing={3}>
        {posts.map((post)=>(
          <Grid item key={post._id} xs={20} sm={3}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts
