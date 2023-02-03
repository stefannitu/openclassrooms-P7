import express from 'express'
import { addComment } from '../controllers'
import { getComment } from '../controllers/comment'

const router = express.Router()

router.post('/', addComment)
router.get('/:postId', getComment)
export default router
