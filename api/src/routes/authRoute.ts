import { Router, Request, Response } from 'express'

import { register, login } from '../controllers'

import { registerValidation } from '../middleware/validator'

const router = Router()

router.post('/api/auth/register', registerValidation, register)
router.post('/api/auth/login', login)

export default router
