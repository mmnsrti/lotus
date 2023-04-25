import mongoose from "mongoose"
import PostMessage from "../models/postmessage.js"

 
export const getPosts = async (req,res)=>{
    try {
        const postMessage = await PostMessage.find()

        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message:error.message})
    }}
export const createPost = async(req,res)=>{
    const post = req.body 
    const newPost = new PostMessage(post)
    try {
       await newPost.save()
       res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}
export const updatePost=async(req,res)=>{
    const { id:_id} =req.params 
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: 'Invalid ID' });
      }
      try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    
        if (!updatedPost) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    };
    export const deletePost=async(req,res)=>{
        const { id:_id} =req.params 
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: 'Invalid ID' });
          }
          try {
            const deletedPost = await PostMessage.findByIdAndRemove(_id);
            if (!deletedPost) {
              return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(deletedPost);
          } catch (error) {
            res.status(404).json({ message: error.message });
          }
    }
    export const likePost=async(req,res)=>{
        const { id:_id} =req.params
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: 'Invalid ID' });

        }
        const post = await PostMessage.findById(_id)
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true })
        res.status(200).json(updatedPost)
        
    }
      
