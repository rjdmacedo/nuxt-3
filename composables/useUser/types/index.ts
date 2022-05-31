import type { User, ApiError } from "~/types/core"
import type { DeepReadonly, Ref } from "@vue/reactivity"

export interface UseUserError {
  logout: ApiError | any
  sendToken: ApiError | any
  authenticate: ApiError | any
}

export type UseUserSendTokenParams = {
  email: string
}

export type UseUserAuthenticateParams = {
  email: string
  token: string
}

export type UseUserLogout = () => Promise<void>
export type UseUserSendToken = (params: UseUserSendTokenParams) => Promise<void>
export type UseUserAuthenticate = (params: UseUserAuthenticateParams) => Promise<void>

export interface UseUser {
  data: DeepReadonly<Ref<User | null>>
  error: DeepReadonly<Ref<UseUserError>>
  loading: DeepReadonly<Ref<boolean>>
  logout: UseUserLogout
  sendToken: UseUserSendToken
  authenticate: UseUserAuthenticate
}
