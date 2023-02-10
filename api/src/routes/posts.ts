import { Router } from 'express'
import { isLoggedIn } from '../middleware/isLoggedIn'
import { upload } from '../middleware/uploadFile'

import {
    savePost,
    getPost,
    deletePost,
    readPost,
    getUserPosts,
} from '../controllers'
const router = Router()
router.post('/', isLoggedIn, upload.single('image'), savePost)
router.get('/', isLoggedIn, getPost)
router.patch('/delete/:postId', isLoggedIn, deletePost)
router.post('/read/', readPost)
router.get('/:userId', getUserPosts)
export default router
