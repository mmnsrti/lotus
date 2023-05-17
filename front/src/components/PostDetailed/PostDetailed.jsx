import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getpost, getpostsBySearch } from "../../actions/Post";
import moment from "moment";
import Comment from "./Comment";
import Darkmode from '../Posts/Post/Darkmode'
import "./PostDetailed.css";
const PostDetailed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, isLoading, post } = useSelector((state) => state.posts);
  const { id } = useParams();
  useEffect(() => {
    const getPostData = () => {
      if (!isLoading) {
        dispatch(getpost(id));
      }
    };

    getPostData();
  }, [id]);
  useEffect(() => {
    if (post) {
      dispatch(
        getpostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);
  if (!post) return null;
  if (isLoading) {
    return (
      <Paper elevation={6} className="Loading-paper-postDetails">
        <CircularProgress />
      </Paper>
    );
  }
  const recommended = posts.filter(({ _id }) => _id !== post._id);
  const openPost = (_id) => navigate(`/posts/${_id}`);
  return (
    <div className="post-container">
      <div className="post-container-detailes">
        <div className="post-details">
          <Typography variant="h3" component="h2" className="title-postDetails">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
            className="tags-postDetails"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            className="message-postDetails"
          >
            {post.message}
          </Typography>
          <Typography variant="h6" className="moment-postDetails">
            Created by: {post.name}
          </Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1" className="Chat-postDetails">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1" className="Comments-postDetails">
            <Comment post ={post}/>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className="post-image">
          <img
            className="post-image__img"
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommended.length && (
  <div className="YouMight-postDetails">
    <Typography gutterBottom variant="h5">
      You Might Also Like
    </Typography>
    <Divider />
    <div className="recommended-postDetails">
      {recommended.map(
        ({ title, message, name, likes, selectedFile, _id }) => (
          <div
            className="recommended-postDetail"
            key={_id}
            onClick={() => {
              openPost(_id);
            }}
          >
            <img alt="selectedFile-postDetails" src={selectedFile} />
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              {name}
            </Typography>
            <Typography gutterBottom variant="h6">
              {message}
            </Typography>
            <Typography gutterBottom variant="h6" className="like">
              Likes:{likes.length}
            </Typography>
          </div>
        )
      )}
          </div>
        </div>
      )}
     
    </div>
  );
};

export default PostDetailed;
