import { Router } from 'express'
import { upload } from '../middleware/uploadFile'

import { register, login, logout } from '../controllers'

import { isGuest } from '../middleware/isGuest'
import { registerValidation } from '../middleware/registerValidation'

const router = Router()

router.post(
    '/api/auth/register',
    isGuest,
    upload.single('userAvatar'),
    registerValidation,
    register
)
router.post('/api/auth/login', isGuest, login)
router.post('/api/auth/logout', logout)

export default router
