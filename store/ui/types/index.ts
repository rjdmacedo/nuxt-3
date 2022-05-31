import type { Store } from "pinia"
import type { Theme } from "~/types/core"

export interface UseUIStoreState {
  theme: {
    data: Theme[]
    selected: Theme
  }
  authentication: {
    modal: {
      isOpen: boolean
    }
  }
}

export type UseUIStore = Store<"ui", UseUIStoreState>
