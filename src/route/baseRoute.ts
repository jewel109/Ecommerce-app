import express, { Router } from "express"
import { customerRouter } from "./customerRouter"

export const router = express.Router()

router.use('/customer', customerRouter)
