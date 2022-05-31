import type { UseUser, UseUserAuthenticate, UseUserLogout, UseUserSendToken } from "@/composables/useUser/types"
import type { ApiResponse, User } from "@/types/core"

import { readonly } from "vue"
import { storeToRefs } from "pinia"
import { useUserStore } from "@/store/user"
import { useCookie } from "#app"

export function useUser(): UseUser {
  const cookie = useCookie<User>("user")
  const { user, error, loading } = storeToRefs(useUserStore())

  const sendToken: UseUserSendToken = async params => {
    try {
      loading.value = true
      error.value.sendToken = null

      await $fetch<ApiResponse<void>>("/api/auth/send-token", {
        method: "post",
        body: params,
      })
    } catch (err) {
      error.value.sendToken = err
    } finally {
      loading.value = false
    }
  }

  const authenticate: UseUserAuthenticate = async params => {
    try {
      loading.value = true
      error.value.authenticate = null

      const response = await $fetch<ApiResponse<User>>("/api/auth/authenticate", {
        method: "post",
        body: params,
      })

      error.value.authenticate = response.error?.message
      user.value = response.data
    } catch (err) {
      error.value.authenticate = err
    } finally {
      loading.value = false
    }
  }

  const logout: UseUserLogout = async () => {
    try {
      loading.value = true
      error.value.logout = null
      user.value = null
      cookie.value = null
    } catch (err) {
      error.value.logout = err
    } finally {
      loading.value = false
    }
  }

  return {
    data: readonly(user),
    error: readonly(error),
    loading: readonly(loading),
    logout,
    sendToken,
    authenticate,
  }
}
