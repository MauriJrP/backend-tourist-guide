import {Router} from 'express';
const router: Router = Router();
import * as commentsCtrl from '../controllers/comments.controller';

router.get('/:idPlace', commentsCtrl.getPlaceComments)

export default router;