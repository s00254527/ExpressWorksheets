import {Router} from 'express';
import { validate } from '../middleware/validate.middleware';
import { loginZSchema, registerZSchema } from '../models/users';
import { AuthController } from '../controllers/auth';
import { authenticateJWT } from '../middleware/auth.middleware';



const router = Router();
const authController = new AuthController();

router.post('/register',validate(registerZSchema),authController.register);
router.post('/login',validate(loginZSchema),authController.login);
router.get('/me',authenticateJWT,authController.me);

export default router;