import Router from 'express'

import { testUser } from '../controllers/testUserCtrl'

const router = Router()

router.get('/api/testUser', testUser)

export default router
