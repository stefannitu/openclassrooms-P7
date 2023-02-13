import express from 'express'
import { deleteUser, hasCookie } from '../controllers'
import { getUser } from '../controllers'
import { isLoggedIn } from '../middleware/isLoggedIn'

const router = express.Router()
router.get('/', hasCookie)
router.get('/:userId', getUser)
router.patch('/delete', isLoggedIn, deleteUser)

export default router
