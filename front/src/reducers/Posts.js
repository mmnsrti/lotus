import { FETCH_ALL,UPDATE,CREATE,DELETE,LIKE } from '../constants/actionTypes'
const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        
        case CREATE:
            return [...posts,action.payload];
        case DELETE:
            return posts.filter(post => post.id!== action.payload);
        case UPDATE:
        case LIKE:
            return posts.map(post => post._id === action.payload._id? action.payload : post);
         
        default:
            return posts;
    }
}

export default postsReducer;
