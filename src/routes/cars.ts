import { Router } from 'express'; 
import { CarController } from '../controllers/cars'; 
import { validate } from '../middleware/auth.middleware';
import { carSchemaZSchema } from '../models/cars';


//updated the routes to include the authenticateKey middleware for all routes.
//seems to be working so im happy out 
const router = Router(); 
const carController = new CarController(); 

router.get('/',validate(carSchemaZSchema), carController.getAllCars); 

router.get('/:id', validate(carSchemaZSchema), carController.getCarById); 


router.post('/', validate(carSchemaZSchema), carController.createCar2); 

//router.put('/:id', carController.updateCar); 

router.delete('/:id', validate(carSchemaZSchema), carController.deleteCar); 

export default router; 