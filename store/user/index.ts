import { defineStore } from "pinia"
import { useCookie } from "#app"
import { User } from "~/types/core"
import { UseUserStore, UseUserStoreState } from "~/store/user/types"

export const useUserStore = (): UseUserStore => {
  const cookie = useCookie<User>("user")

  return defineStore("user", {
    state: (): UseUserStoreState => ({
      user: cookie.value || null,
      error: {
        logout: null,
        sendToken: null,
        authenticate: null,
      },
      loading: false,
    }),
  })()
}
