import express from 'express'
import loginController from '../controllers/loginController.js';
import registrationController from '../controllers/registrationController.js';



const router = express.Router();

router.post('/login',loginController);
router.post('/registration',registrationController);

export default router;