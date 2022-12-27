import { Router } from 'express'

import { register, login, logout } from '../controllers'

import { authenticated } from '../middleware/loginProtection'
import { registerValidation } from '../middleware/validator'

const router = Router()

router.post('/api/auth/register', authenticated, registerValidation, register)
router.post('/api/auth/login', authenticated, login)
router.post('/api/auth/logout', logout)

export default router
