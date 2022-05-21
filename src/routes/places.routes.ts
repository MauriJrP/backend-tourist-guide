import {Router} from 'express';
import * as placesCtrl from '../controllers/places.controller';
import { schemaValidation } from '../middlewares/index';
import { placeSchema } from '../schemas/places.schema';


const router: Router = Router();

router.get('/', placesCtrl.getPlacesPage);
router.get('/placeTypes', placesCtrl.getPlaceTypes);
router.get('/locations', placesCtrl.getLocations);
router.get('/:placeId', placesCtrl.getPlaceById);

router.post('/create', schemaValidation(placeSchema), placesCtrl.createPlace);
router.post('/addGallery', placesCtrl.addGallery);

router.put('/:placeId', placesCtrl.updatePlaceById);

router.delete('/:placeId', placesCtrl.deletePlaceById);

export default router;