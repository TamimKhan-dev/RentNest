import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Route not found");
  (error as any).statusCode = 404;
  next(error);
};
