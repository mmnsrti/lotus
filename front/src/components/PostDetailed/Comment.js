import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/Post";

const Comment = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const dispatch = useDispatch();
  const ref = useRef();
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = async (e) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments=await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment("");
    ref.current.scrollIntoView({behavior:'smooth'})
  };

  return (
    <div>
      <div className="Comment-section">
        <div className="Comment-innercontainer">
          <Typography gutterBottom variant="h6">
            Add Comment
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i}><strong>{c.split(':')[0]} :</strong>
            {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={ref}/>
        </div>
        {user?.result?.name && (
          <div className="Comment-inputcontainer" style={{ width: "70%" }}>
            <Typography>Write a comment</Typography>
            <TextField
              multiline
              fullWidth
              label="Comment"
              ref={ref}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleSubmit}
            >
              Add Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
