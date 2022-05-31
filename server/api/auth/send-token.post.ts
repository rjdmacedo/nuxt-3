import { TokenType } from "@prisma/client"
import { defineEventHandler, useBody } from "h3"

import prisma from "~/server/prisma"
import { generateEmailToken } from "~/server/utils"
import { EMAIL_TOKEN_EXPIRATION_MINUTES } from "~/server/constants"
import { UseUserSendTokenParams } from "~/composables/useUser/types"
import { ApiResponse } from "~/types/core"

export default defineEventHandler<ApiResponse<null>>(async event => {
  const { email } = await useBody<UseUserSendTokenParams>(event)

  const emailToken = generateEmailToken()
  // ten minutes from now
  const expiration = new Date(Date.now() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000)

  try {
    const token = await prisma.token.create({
      data: {
        emailToken,
        expiration,
        type: TokenType.EMAIL,
        user: {
          connectOrCreate: {
            create: {
              email,
            },
            where: {
              email,
            },
          },
        },
      },
    })

    await prisma.token.deleteMany({
      where: {
        userId: token.userId,
        id: { not: token.id },
      },
    })

    console.log(token.emailToken)
    /*
    await getSendgrid()
      .send({
        to: email,
        from: 'rafaelmacedo4@gmail.com',
        subject: 'Login token for the modern backend API',
        text: `The login token for the API is: ${emailToken}`,
      })
      .then(() =>
        logger.info(`email sent to "${email}" with code "${emailToken}"`),
      )
      .catch(logger.error)
*/
    return {
      data: null,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: err,
    }
  }
})
