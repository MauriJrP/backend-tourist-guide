import {Router} from 'express';
const router: Router = Router();

import {updateUser, deleteUser, getAllUsers, getUserById} from '../controllers/user.controller'
import { schemaValidation } from '../middlewares';
import { updateUserSchema } from '../schemas/user.schema';

// router.get('/:id', getUserById);
router.put('/:idUser', schemaValidation(updateUserSchema), updateUser);

export default router;