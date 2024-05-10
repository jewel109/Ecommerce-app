import { consola } from "consola"
import express, { Request, Router, Response, NextFunction } from "express"
import { addCustomer, getAccessToServer, getCustomer, loginCustomer } from "../controller/customerController"

export const customerRouter = express.Router()

customerRouter.get('/1', (req: Request, res: Response, next: NextFunction) => {

  consola.log("customerRouter")
  res.status(200).json({
    id: 1
  })
})

customerRouter.post("/addCustomer", addCustomer)
customerRouter.post("/getCustomer", getCustomer)

customerRouter.post("/loginCustomer", loginCustomer)
customerRouter.post("/getAccessToServer", getAccessToServer)

