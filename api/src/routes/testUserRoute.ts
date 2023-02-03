import Router from 'express'

import { userHasCookie } from '../controllers/hasCookieCtrl'

const router = Router()

router.get('/api/testuser', userHasCookie)

export default router
