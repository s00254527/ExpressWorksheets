import { CarModel, ICar } from '../models/cars'
import { HydratedDocument } from 'mongoose';
import { Request, Response } from 'express';
import { CarService } from '../services/CarService';

const carService = new CarService();

export const getCars = async (_req: Request, res: Response): Promise<void> => { 

    try { 
      const cars = await carService.getAllCars(); 
      res.status(200).json(cars); 
    } catch (error) { 
      res.status(500).json({ message: 'Error fetching cars', error }); 
    } 
  }; 

  export const getCarById = async (req: Request, res: Response): Promise<void> => { 

    try { 
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; 
      const car = await carService.getCarById(id); 
      if (!car) { 
        res.status(404).json({ message: 'Car not found' }); 
        return; 
      } 
      res.status(200).json(car); 
    } catch (error) { 
      res.status(500).json({ message: 'Error fetching car', error }); 
    } 
  }; 

  export const createCar = async (req: Request, res: Response): Promise<void> => { 

    try { 
      const newCar = await carService.createCar(req.body); 
      res.status(201).json(newCar); 

    } catch (error) { 
      res.status(500).json({ message: 'Error inserting into MongoDB', error }); 
    } 
  }; 

 

  export const updateCar = async (req: Request, res: Response): Promise<void> => { 
    try { 
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; 
      const updatedCar = await carService.updateCar(id, req.body); 

      if (!updatedCar) { 
        res.status(404).json({ message: 'Car not found' }); 
        return; 
      } 

      res.status(200).json(updatedCar); 
    } catch (error) { 
      res.status(500).json({ message: 'Error updating car', error }); 
    } 
  }; 

 

  export const deleteCar = async (_req: Request, res: Response): Promise<void> => { 
    res.status(200).json({ success: true,  
      data: `this is just dummy for now a response to the delete car by id request with car id ${_req.params.id}` });  

  }; 


















































export class CarController {
  async getAllCars(): Promise<ICar[]> {
    return await CarModel.find().lean();
  } 
  async getCarById(id: string): Promise<ICar | null> { 
    return await CarModel.findById(id).lean(); 
  } 
  async createCar(carData: ICar): Promise<HydratedDocument<ICar>> { 
    const car = new CarModel(carData); 
    return await car.save();
  } 
 
  async updateCar(id: string, carData: Partial<ICar>): Promise<ICar | null> { 
    return await CarModel.findByIdAndUpdate(id, carData, { returnDocument: 'after' }).lean(); 
  } 

  async deleteCar(id: string): Promise<ICar | null> { 
    return await CarModel.findByIdAndDelete(id).lean(); 
  } 

}



