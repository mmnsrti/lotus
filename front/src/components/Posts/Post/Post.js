import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Button,Typography } from '@mui/material'
import {FcLikePlaceholder ,FcLike,FcEmptyTrash,FcMenu} from 'react-icons/fc'
import {useDispatch} from 'react-redux'
import Moment from 'react-moment';
import { deletePost,likePost } from '../../../actions/Post';

import './post.css'
import moment from 'moment';

const Post = ({ post, setCurrentId }) => {
  
  const dispatch = useDispatch()
  if (!post) return null; // or any other error handling mechanism
  return (
    <Card className='card'>
      <CardMedia className='card-media' image={post.selectedFile} title={post.title}/>
        <div className='typography-creator'>
          <Typography className='creator' variant='h5'>{post.creator}</Typography>
          <Typography className='creatorAt' variant='body2'>{moment(post.creatorAt).fromNow()}</Typography>
        </div>
        <div className='button1'>
          <Button
      
            onClick={() => setCurrentId(post._id)}
           >
            <FcMenu fontSize='default' />
          </Button>
        </div>
        <div className='tags'>
          <p className='tag' >{post.tags.map((tag)=>`#${tag} `)}</p>
        </div>
        <CardContent>
          <Typography className='message' variant='h5' gutterBottom>{post.message}</Typography>
        </CardContent>
        <CardActions className='cardActions'>
          <Button size='small' color='primary' onClick={()=>dispatch(likePost(post._id))}>
            <FcLikePlaceholder fontSize={33}/>
            Like
            {post.likeCount}
          </Button>
          <Button size='small' color='primary' onClick={()=>dispatch(deletePost(post._id)) }>
            <FcEmptyTrash fontSize={33}/>
            Delete
            
          </Button>
        </CardActions>

      </Card>
      );
};
export default Post