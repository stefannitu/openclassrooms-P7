import express from 'express'
import { hasCookie } from '../controllers'
// import { getUser } from '../controllers/userCtrl'

const router = express.Router()
// router.get('/find/:userId', getUser)
router.get('/', hasCookie)
export default router
