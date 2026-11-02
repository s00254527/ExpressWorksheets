import{ Request, Response, NextFunction } from 'express';
import { z } from 'zod';


export const validate = (schema: z.ZodObject<any>)   => ( 
  req: Request, res: Response, next: NextFunction 
) : void => { 
    //adding this to check if get or delete request as they dont have  abody
    if(req.method === 'GET' || req.method === 'DELETE') {
        next();
        return;
    }

  const validation = schema.safeParse(req.body); 
  if (!validation.success) { 
    res.status(400).json({ 
      message: 'Validation failed numb nuts', 
      errors: validation.error.issues 
    }); 
    return; 
  } 
  req.body = validation.data 
  next(); 
}; 