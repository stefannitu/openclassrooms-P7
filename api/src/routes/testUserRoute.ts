import Router from 'express'

import { userHasCookie } from '../controllers/testUserCtrl'

const router = Router()

router.get('/api/testuser', userHasCookie)

export default router
