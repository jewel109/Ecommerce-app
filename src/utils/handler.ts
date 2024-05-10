import { consola } from "consola";
import { NextFunction, Request, Response } from "express";

export const handler = (handler: (req: Request, res: Response, next: NextFunction) => void | Promise<void>) => {

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      consola.error(error)
      next(error)
    }
  }
}
