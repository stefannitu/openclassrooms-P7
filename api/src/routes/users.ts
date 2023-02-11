import express from 'express'
import { hasCookie } from '../controllers'
import { getUser } from '../controllers'

const router = express.Router()
router.get('/', hasCookie)
router.get('/:userId', getUser)
export default router
