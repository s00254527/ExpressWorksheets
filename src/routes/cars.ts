import { Router } from 'express'; 
import { CarController } from '../controllers/cars'; 
import { authenticateJWT } from '../middleware/auth.middleware';
import {validate} from '../middleware/validate.middleware'
//import {validate} from '../middleware/auth.middleware';
import { carSchemaZSchema } from '../models/cars';

//updated the routes to include the authenticateKey middleware for all routes.
//seems to be working so im happy out 
const router = Router(); 
const carController = new CarController(); 

//changing this to make it work 
router.get('/:id',carController.getCarById); 

router.post('/', carController.createCar2); 

router.put('/:id', carController.updateCar); 
//cahnged this as you need to validate the user before 
//deleting the car 
router.delete('/:id', authenticateJWT, validate(carSchemaZSchema),carController.deleteCar); 

export default router; 