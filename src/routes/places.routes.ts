import {Router} from 'express';
import * as placesCtrl from '../controllers/places.controller';

const router: Router = Router();

router.get('/', placesCtrl.getPlacesPage);
router.post('/', placesCtrl.createPlace);
router.get('/:placeId', placesCtrl.getPlaceById);
router.put('/:placeId', placesCtrl.updatePlaceById);
router.delete('/:placeId', placesCtrl.deletePlaceById);

export default router;