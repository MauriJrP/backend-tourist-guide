import {Router} from 'express';
const router: Router = Router();

import {signup, login} from '../controllers/auth.controller';
import {schemaValidation} from '../middlewares/index';
import { loginSchema, signupSchema } from '../schemas/auth.schema';

router.post('/signup', schemaValidation(signupSchema), signup);
router.post('/login', schemaValidation(loginSchema), login);



export default router;