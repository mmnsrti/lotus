import axios from 'axios'

const url = 'http://localhost:5000/posts'
export const fetchPost = () => axios.get(url)
export const createPost =(newpost)=>axios.post(url,newpost)
export const updatePost =(id,updatedpost)=>axios.patch(`${url}/${id}`,updatedpost)
export const deletePost =(id)=>axios.delete(`${url}/${id}`)
export const likePost =(id)=>axios.patch(`${url}/${id}/likePost`)

