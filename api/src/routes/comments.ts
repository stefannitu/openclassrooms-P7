import express from 'express'
import { addComment, deletePost } from '../controllers'
import { getComment } from '../controllers/comment'

const router = express.Router()

router.post('/', addComment)
router.get('/:postId', getComment)

router.patch('/:postId', deletePost)
export default router
