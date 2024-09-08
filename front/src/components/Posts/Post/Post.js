import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import {
  FcLikePlaceholder,
  FcLike,
  FcEmptyTrash,
  FcMenu,
} from "react-icons/fc";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/Post";
import { useNavigate } from "react-router-dom";
import "./post.css";
import moment from "moment";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const userId = user?.result._id || user?.result?.googleId;
  const [likes, setLikes] = useState(post?.likes);
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));
    setLikes(
      hasLikedPost
        ? post.likes.filter((id) => id !== userId)
        : [...post.likes, userId]
    );
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <FcLike fontSize="large" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FcLikePlaceholder fontSize="large" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <FcLikePlaceholder fontSize="large" />
        &nbsp;Like
      </>
    );
  };
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  console.log(post)
  const dispatch = useDispatch();
  if (!post) return null; // or any other error handling mechanism
  return (
    <div className="card">
      <div className="card-ButtonBase" onClick={openPost}>
        <div className="flip">
          <img
            src={post.selectedFile}
            className="selectedFile"
            alt="selectedFile"
          />
        </div>
        <div className="card-content">
          <div className="typography-creator">
            <div className="creator" variant="h5">
              {post.name}
            </div>
            <div className="title">
              {post.title && post.title.length > 25
                ? `${post.title.slice(0, 18)}...`
                : post.title}
            </div>
          </div>

          <CardContent>
            <Typography className="message" variant="h6" gutterBottom>
              <Typography className="message" variant="h6" gutterBottom>
                {post.message && post.message.length > 101
                  ? `${post.message.slice(0, 100)}...`
                  : post.message}
              </Typography>
            </Typography>
          </CardContent>
          <div className="tags">
            <p className="tag">{post.tags.map((tag) => `#${tag} `)}</p>
          </div>
        </div>
      </div>
      <div className="creatorAt">
        {post.createdAt && moment(post.createdAt).fromNow()}
      </div>
      <CardActions className="cardActions">
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
          className="like"
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
            className="delete"
          >
            <FcEmptyTrash fontSize="large" />
            Delete
          </Button>
        )}
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className="button1">
            <Button
              onClick={() => {
                navigate("/create");
                setCurrentId(post._id);
              }}
            >
              <FcMenu fontSize="default" />
            </Button>
          </div>
        )}
      </CardActions>
    </div>
  );
};
export default Post;
