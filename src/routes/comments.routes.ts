import {Router} from 'express';
const router: Router = Router();
import * as commentsCtrl from '../controllers/comments.controller';
import {schemaValidation} from '../middlewares/index';
import { commentSchema } from '../schemas/comment.schema';

router.get('/:idPlace', commentsCtrl.getPlaceComments)
router.post('/', schemaValidation(commentSchema), commentsCtrl.createComment)
router.delete('/:idComment', commentsCtrl.deleteComment)

export default router;