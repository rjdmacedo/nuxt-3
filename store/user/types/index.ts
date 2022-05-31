import type { Store } from "pinia"
import type { User } from "~/types/core"
import type { UseUserError } from "~/composables/useUser/types"

export interface UseUserStoreState {
  user: User | null
  error: UseUserError
  loading: boolean
}

export type UseUserStore = Store<"user", UseUserStoreState>
