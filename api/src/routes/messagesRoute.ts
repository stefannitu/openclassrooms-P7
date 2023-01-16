import { Router } from 'express'
import { isLoggedIn } from '../middleware/isLoggedIn'
import { savePost, listPost } from '../controllers'
const router = Router()
router.post('/api/message/post', isLoggedIn, savePost)
router.get('/api/message/post', isLoggedIn, listPost)

export default router
