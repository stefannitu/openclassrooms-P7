import express from 'express'
import { getUser } from '../controllers/userCtrl'

const router = express.Router()
router.get('/find/:userId', getUser)
export default router
