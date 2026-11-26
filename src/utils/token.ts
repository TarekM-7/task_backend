import { randomInt } from 'node:crypto'

export const generateToken = () => randomInt(100000, 1000000).toString()
