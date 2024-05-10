import jwt, { JwtPayload } from "jsonwebtoken"

import { User, userSchema } from "../controller/customerController"
import { ZodError, z } from "zod"
import { consola } from "consola"
import { NextFunction } from "express"


export async function createToken(user: User, next: NextFunction): Promise<string | void> {
  const key = process.env.JWT_SECRET || ""

  // consola.log("key " + key)

  const parsedUser = userSchema.parse(user)

  const token = jwt.sign(parsedUser, key, { expiresIn: "30d" })

  return z.string().parse(token)
}



// consola.log(token)





export async function veryfyToken(token: string): Promise<User> {
  const key = process.env.JWT_SECRET || ""



  const decode = jwt.verify(token, key)

  const decoded = userSchema.parse(decode)


  consola.log(decoded)
  return { name: decoded.name, email: decoded.email, password: decoded.password }
}
