import jwt from "jsonwebtoken"
import prisma from "~/server/prisma"
import { defineEventHandler, setCookie, useCookie } from "h3"

export default defineEventHandler(async event => {
  const cookie = useCookie(event, "session")

  try {
    const session = jwt.verify(cookie, process.env.JWT_SECRET)

    if (session.tokenId) {
      const { user } = await prisma.token.findUnique({
        where: { id: session.tokenId },
        include: { user: true },
      })

      event.context.user = user
    }
  } catch (err) {
    event.context.user = null
  }
})
