import express from 'express'
import loginController from '../controllers/loginController.js';
import registrationController from '../controllers/registrationController.js';
import verificationController from '../controllers/verificationController.js';



const router = express.Router();

router.post('/login',loginController);
router.post('/registration',registrationController);
router.post('/verify',verificationController);

export default router;