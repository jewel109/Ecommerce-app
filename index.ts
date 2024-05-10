import express from "express";
import consola from "consola"
import dotenv from "dotenv"
import path from "path"
import createHttpError from "http-errors";
import { router } from "./src/route/baseRoute";

consola.log(dotenv.config({ path: path.resolve(__dirname, "./dev.env") }))

// consola.log(process.env.DB_URL)


const app = express()

app.use(express.json())
app.use('/', router)
app.use('*', (req, res, next) => {
  next(createHttpError.NotFound().message)
})





app.listen(13000, () => {
  consola.success("server listening in port 13000 finally")
})
