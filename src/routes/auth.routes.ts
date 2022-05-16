import {Router} from 'express';
const router: Router = Router();

import {signup, login} from '../controllers/auth.controller';
import {verifyToken, schemaValidation} from '../middlewares/index';
import { loginSchema } from '../schemas/auth.schema';

router.post('/signup', signup);
router.post('/login', schemaValidation(loginSchema), login);



export default router;