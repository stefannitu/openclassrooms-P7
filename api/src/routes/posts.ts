import { Router } from 'express'
import { isLoggedIn } from '../middleware/isLoggedIn'
import { upload } from '../middleware/uploadFile'

import { savePost, getPost, deletePost } from '../controllers'
const router = Router()
router.post('/', isLoggedIn, upload.single('image'), savePost)
router.get('/', isLoggedIn, getPost)
router.delete('/:id', isLoggedIn, deletePost)

export default router
