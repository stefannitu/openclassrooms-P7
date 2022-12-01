import { Router, Request, Response } from 'express'

import { register } from '../controllers'

import { registerValidation } from '../middleware/validator'

const router = Router()

router.post('/api/auth/register', registerValidation, register)

export default router
