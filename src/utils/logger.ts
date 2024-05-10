import { consola } from "consola";
import { NextFunction, Request, Response } from "express";

export const logger = async (req: Request, res: Response, next: NextFunction) => {
  consola.log(`${req.method}`)
  next()
}
