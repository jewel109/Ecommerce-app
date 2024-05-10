import { customers_schema } from "../db/schema/customerSchema"
import { db } from "../db/util"
import { NextFunction, Request, Response } from "express"
import { consola } from "consola"
import { z } from "zod"
import { createToken, veryfyToken } from "../utils/jsonwbtoken"
import { createHash } from "../utils/passwordHashing"
import { eq } from "drizzle-orm"
import { handler } from "../utils/handler"

export const userSchema = z.object({
  name: z.string().min(4).default(""),
  email: z.string().email().default(""),
  password: z.string().min(4).default("")
})

export type User = z.infer<typeof userSchema>

const user: User = {
  name: "",
  email: "",
  password: ""
}

export const addCustomer = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { name, email, password }: User = req.body

    const token = await createToken({ name, email, password }, next).catch(err => consola.log(err))



    const decoded = await veryfyToken(z.string().parse(token)).catch(err => consola.error(err))


    const dec = userSchema.parse(decoded)



    consola.log("decoded %0", dec, token)

    const hashedPassword = createHash(password)

    consola.log(hashedPassword)
    const customer = await db.insert(customers_schema).values({ name, email, password, hashedPassword })
    //
    // const customer = await db.select().from(customers_schema)


    res.status(200).json({
      customer
    })


  } catch (error) {
    if (error instanceof z.ZodError) {
      consola.error(error)
      next(error.message)
    }
    consola.error(error)
    next()

  }

}


export const getCustomer = async (_req: Request, res: Response, next: NextFunction) => {

  try {
    const data = await db.select().from(customers_schema)

    if (data) {
      return res.status(200).json({
        data
      })
    }

    res.status(200).json({
      msg: "no data"
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      consola.error(error)
      return next(error.message)
    }
    next()


  }

}

export const loginCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name }: User = req.body

    const customer = await db.select().from(customers_schema).where(eq(customers_schema.name, name))

    consola.log(customer[0])

    const { email, password } = customer[0]

    const token = await createToken({ name, email: z.string().parse(email), password: z.string().parse(password) }, next)

    consola.log(token)

    if (!customer) {
      return res.json({
        msg: "not found customer"
      })
    }

    res.status(200).json({

      customer,
      token
    })



  } catch (error) {
    if (error instanceof z.ZodError) {
      consola.error(error)
      return next(error.message)
    }
    consola.log(error)
    next(error)


  }
}

export const getAccessToServer = handler(async (req, _res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      return next("authorization not found")
    }

    const veryfied = await veryfyToken(authorization)
    consola.log(veryfied)

  } catch (error) {
    consola.error(error)
    next(error)
  }

})


