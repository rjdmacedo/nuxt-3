import { useUser } from "@/composables/useUser"
import { defineNuxtRouteMiddleware, navigateTo } from "#app"
import { useUI } from "#imports"

export default defineNuxtRouteMiddleware(() => {
  const ui = useUI()
  const { data: user } = useUser()

  if (!user.value) {
    ui.authentication.modal.open()
    return navigateTo("/?auth-modal-opened=true", {
      replace: true,
      redirectCode: 302,
    })
  }
})
