import { User as PrismaUser, Token as TokenPrisma } from "@prisma/client"

export type TODO = any

export enum TONE {
  DARK = "dark",
  LIGHT = "light",
}

export interface ApiError {
  message: string
  status: number
}

export interface ApiResponse<T> {
  data?: T | null
  error?: ApiError
}

export type User = PrismaUser

export type Token = TokenPrisma

export interface Theme {
  tone: TONE
  name: string
  value: string
}
