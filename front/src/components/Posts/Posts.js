import React, { useEffect } from 'react';
import Post from './Post/Post'
import {Grid , CircularProgress} from '@mui/material'
import { useSelector } from 'react-redux'

import './posts.css'
const Posts = ({setCurrentId}) => {
  
  const {posts,isLoading} = useSelector((state) => state.posts);
  if (!posts.length && !isLoading) {
    return <div className='No-posts'>No posts</div>
   }
  return (
    isLoading ? <CircularProgress/> :(
      <div className= 'Grid-posts' container alignItems='stretch' spacing={3}>
        {posts.map((post)=>(
          <Grid className='Grid-posts1' item key={post._id} xs={20} sm={3}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </div>
    )
  )
}

export default Posts
