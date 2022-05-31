import { defineEventHandler, useBody, appendHeader, setCookie } from "h3"
import { ApiResponse } from "~/types/core"
import { UseUserAuthenticateParams } from "~/composables/useUser/types"
import prisma from "~/server/prisma"
import { AUTHENTICATION_TOKEN_EXPIRATION_HOURS } from "~/server/constants"
import { TokenType } from "@prisma/client"
import { generateToken } from "~/server/utils"

export default defineEventHandler(async event => {
  const { email, token } = await useBody<UseUserAuthenticateParams>(event)

  // Get short-lived email token
  const fetchedEmailToken = await prisma.token.findUnique({
    where: {
      emailToken: token,
    },
    include: {
      user: true,
    },
  })

  if (!fetchedEmailToken?.valid) {
    // If the token doesn't exist or is not valid, return 401 unauthorized
    return {
      data: null,
      error: {
        status: 401,
        message: "Invalid token",
      },
    }
  }

  if (fetchedEmailToken.expiration < new Date()) {
    // If the token has expired, return 401 unauthorized
    return {
      data: null,
      error: {
        status: 401,
        message: "Token expired",
      },
    }
  }

  // If token matches the user email passed in the payload, generate long-lived API token
  if (fetchedEmailToken?.user?.email === email) {
    // Invalidate the email token after it's been used
    await prisma.token.deleteMany({
      where: {
        userId: fetchedEmailToken.userId,
      },
    })

    const expiration = new Date(Date.now() + AUTHENTICATION_TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000)
    // Persist token in DB so it's stateful
    const apiToken = await prisma.token.create({
      data: {
        expiration,
        type: TokenType.API,
        user: {
          connect: {
            email,
          },
        },
      },
    })

    const authToken = generateToken(apiToken)

    setCookie(event, "user", JSON.stringify(fetchedEmailToken.user))
    setCookie(event, "session", authToken)

    return {
      data: fetchedEmailToken.user,
      error: null,
    }
  } else {
    // If token doesn't match the user email passed in the payload, return 401 unauthorized
    return {
      data: null,
      error: {
        status: 401,
        message: "Credentials do not match",
      },
    }
  }
})
