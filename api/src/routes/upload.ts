import express from 'express'
import { upload } from '../middleware/uploadFile'

const router = express.Router()

router.post('/', upload.single('file'), (req, res) => {
    const file = req.file
    res.status(200).json(file!.filename)
})
export default router
