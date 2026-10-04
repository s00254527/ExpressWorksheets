import { Router } from 'express'; 
import { CarController } from '../controllers/cars'; 
import { authenticateKey } from '../middleware/auth.middleware';

//updated the routes to include the authenticateKey middleware for all routes.
//seems to be working so im happy out 
const router = Router(); 
const carController = new CarController(); 

router.get('/',authenticateKey, carController.getAllCars); 

router.get('/:id', authenticateKey, carController.getCarById); 


router.post('/', authenticateKey, carController.createCar2); 

//router.put('/:id', carController.updateCar); 

router.delete('/:id', authenticateKey, carController.deleteCar); 

export default router; 