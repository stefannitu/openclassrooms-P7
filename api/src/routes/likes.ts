import express from 'express'
import { saveLike } from '../controllers/like'

const router = express.Router()

router.post('/', saveLike)
export default router
