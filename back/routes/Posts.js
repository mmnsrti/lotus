import  express  from "express";
import { getpostsBySearch,getpostss ,getPost, createPost,updatePost,deletePost,likePost,commentPost} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router()

router.get('/',getpostss)
router.post('/',auth,createPost)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)
router.get('/search',getpostsBySearch)
router.get('/:id',getPost)
router.post('/:id/commentPost',auth,commentPost)



export default router 