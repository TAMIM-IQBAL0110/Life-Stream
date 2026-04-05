import express from 'express'
import userInfoController from '../controllers/userInfoController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router()

router.get('/user',protect, userInfoController)
router.put('/update', protect, userInfoController)
router.delete('/delete', protect, userInfoController)

export default router;