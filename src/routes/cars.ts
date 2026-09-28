import { Router } from 'express'; 
import { CarService } from '../controllers/cars'; 

const router = Router(); 
const carService = new CarService(); 
router.get('/', carService.getAllCars); 


router.get('/:id', carService.getCarById); 

router.post('/', carService.createCar); 

//router.put('/:id', carService.updateCar); 

router.delete('/:id', carService.deleteCar); 

 
export default router; 