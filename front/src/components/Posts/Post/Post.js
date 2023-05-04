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
    setLikes(hasLikedPost ? post.likes.filter((id) => id !== userId) : [...post.likes, userId]);
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><FcLike fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><FcLikePlaceholder fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><FcLikePlaceholder fontSize="small" />&nbsp;Like</>;
  };
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const dispatch = useDispatch();
  if (!post) return null; // or any other error handling mechanism
  return (
    <Card className="card">
      <ButtonBase className="card" onClick={openPost}>
        <CardMedia
          className="card-media"
          image={post.selectedFile}
          title={post.title}
        />
        <div className="typography-creator">
          <Typography className="creator" variant="h5">
            {post.name}
          </Typography>
          <Typography className="creatorAt" variant="body2">
            {post.createdAt && moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div>
          <Typography className="message" variant="body1">
            {post.title}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className="button1">
            <Button onClick={() => setCurrentId(post._id)}>
              <FcMenu fontSize="default" />
            </Button>
          </div>
        )}
        <div className="tags">
          <p className="tag">{post.tags.map((tag) => `#${tag} `)}</p>
        </div>
        <CardContent>
          <Typography className="message" variant="h5" gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className="cardActions">
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <FcEmptyTrash fontSize={33} />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default Post;
