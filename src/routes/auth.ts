import {Router} from 'express';
import { validate } from '../middleware/auth.middleware';
import { loginZSchema, registerZSchema } from '../models/users';
import { AuthController } from '../controllers/auth';

const router = Router();
const authController = new AuthController();

router.post('/register',validate(registerZSchema),authController.register);
router.post('/login',validate(loginZSchema),authController.login);

export default router;