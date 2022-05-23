import {Router} from 'express';
import * as placesCtrl from '../controllers/places.controller';
import { schemaValidation } from '../middlewares/index';
import { placeSchema, filtersSchema } from '../schemas/places.schema';


const router: Router = Router();

router.get('/page/:pageNum', placesCtrl.getPlacesPage);
router.get('/placeTypes', placesCtrl.getPlaceTypes);
router.get('/locations', placesCtrl.getLocations);
router.get('/place/:placeId', placesCtrl.getPlaceById);

router.post('/page/:pageNum', schemaValidation(filtersSchema), placesCtrl.getFilteredPlacesPage);
router.post('/place/create', schemaValidation(placeSchema), placesCtrl.createPlace);
router.post('/place/addGallery', placesCtrl.addGallery);

router.put('/place/:placeId', placesCtrl.updatePlaceById);

router.delete('/place/:placeId', placesCtrl.deletePlaceById);

export default router;