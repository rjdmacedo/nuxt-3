import sendgrid from "@sendgrid/mail"

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "")

export const getSendgrid = () => {
  return sendgrid
}
