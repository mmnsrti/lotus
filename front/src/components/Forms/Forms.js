import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/Post";
import {useNavigate}  from 'react-router-dom'
import "./forms.css";
const user = JSON.parse(localStorage.getItem('profile'))
const Forms = ({ currentId, setCurrentId }) => {
  const navigate = useNavigate()
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((message) => message._id === currentId) : null
  );
  const handleSubmite = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, {...postData, name:user?.result?.name }));
      navigate('/')
      clear()
    } else {
      dispatch(createPost({...postData, name:user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);

    setPostData({

      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  if(!user?.result?.name){
      return(
        <div></div>
      )
  }
  return (
    <div className="paper-form">
      <form
        autoComplete="off"
        noValidate
        className="submit-form"
        onSubmit={handleSubmite}
      >
        <Typography variant="h6">
          {currentId ? "UpdatingPost" : "Creating Post"}
        </Typography>
        
        <TextField
          className="text_field"
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          className="text_field"
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          className="text_field"
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className="file_input">
          <span> Add File</span>
          <FileBase
            className="file_input-file"
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        {postData.title && postData.selectedFile ? (
          <Button
            className="btn-submit"
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        ) : (
          <Button
            className="btn-submit"
            variant="contained"
            color="primary"
            size="large"
            type="button"
            fullWidth
          >
            Submit
          </Button>
        )}

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
      {postData.selectedFile?<img src={postData.selectedFile} alt={postData.selectedFile} className="selectedFile1"/>:<div className="Nofileselected">No file selected</div>}

    </div>
  );
};

export default Forms;
