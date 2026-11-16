import {Router} from 'express';
import { validate } from '../middleware/auth.middleware';
import { registerZSchema } from '../models/users';
import { AuthController } from '../controllers/auth';

const router = Router();
const authController = new AuthController();

router.post('/register',validate(registerZSchema),authController.register);

export default router;