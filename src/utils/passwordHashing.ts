import bcrypt from 'bcrypt'
import { z } from 'zod'

export function createHash(password: string): string {
  const salt = 10
  const hash = bcrypt.hashSync(z.string().parse(password), salt)
  return hash
}

export function veryfyHash(password: string, hash: string) {

  const isCompared = bcrypt.compare(z.string().parse(password), hash)
  return isCompared
}


