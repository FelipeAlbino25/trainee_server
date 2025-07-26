import { ZodError } from 'zod';
import { HttpError } from '../errors/HttpError';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Validation failed',
      errors: err.issues,
    });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  res.status(500).json({
    message: 'Internal server error',
    error: err?.message || err,
  });
}
