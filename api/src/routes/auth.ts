import { Router } from 'express'

//controllers
import { register, login, logout } from '../controllers'

//middleware
import { upload } from '../middleware/uploadFile'
import { isGuest } from '../middleware/isGuest'
import { registerValidation } from '../middleware/registerValidation'

const router = Router()

router.post(
    '/register',
    isGuest,
    upload.single('avatar'),
    registerValidation,
    register
)
router.post('/login', isGuest, login)
router.post('/logout', logout)

export default router
