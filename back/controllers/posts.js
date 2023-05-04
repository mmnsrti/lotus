import mongoose from "mongoose";
import PostMessage from "../models/postmessage.js";

export const getpostss = async (req, res) => {
  const { page } = req.query; // retrieve the current page from the request query parameters

  try {
    const limit = 8; // initialize the number of posts per page
    const startIndex = (Number(page) - 1) * limit; // calculate the starting index based on the current page and number of posts per page

    const totalPosts = await PostMessage.countDocuments(); // count the total number of posts in the database
    const postMessages = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex); // retrieve the posts for the current page, sorted by descending order of ID
    res
      .status(200)
      .json({
        data: postMessages,
        currentPage: Number(page),
        totalPages: Math.ceil(totalPosts / limit),
      }); // return the data along with the metadata in JSON format
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }
  try {
    const deletedPost = await PostMessage.findByIdAndRemove(_id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.status(401).json({ message: "User is not authenticated" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }
  const post = await PostMessage.findById(id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};
export const getpostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    const post = await PostMessage.findById(id);
    post.comments.push(value)
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
};
