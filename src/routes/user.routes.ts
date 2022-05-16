import {Router} from 'express';
const router: Router = Router();

import {updateUser, deleteUser, getAllUsers, getUserById} from '../controllers/user.controller'

router.get('/:id', getUserById);

export default router;