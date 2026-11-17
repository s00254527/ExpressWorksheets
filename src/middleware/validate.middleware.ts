import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodObject<any>) => (
  req: Request, res: Response, next: NextFunction
): void => {
  // GET and DELETE have no body
  if (req.method === 'GET' || req.method === 'DELETE') {
    next();
    return;
  }

  const validation = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!validation.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: validation.error.issues,
    });
    return;
  }

  req.body = validation.data.body;
  next();
};