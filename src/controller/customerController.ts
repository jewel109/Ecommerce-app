
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


