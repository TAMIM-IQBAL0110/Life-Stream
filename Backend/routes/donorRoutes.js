import express from 'express'
import { getUserInfo, updateUserInfo, deleteUserInfo } from '../controllers/userInfoController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router()

router.get('/:userId', protect, getUserInfo);
router.put('/update/:userId', protect, updateUserInfo);
router.delete('/delete/:userId', protect, deleteUserInfo);

export default router;