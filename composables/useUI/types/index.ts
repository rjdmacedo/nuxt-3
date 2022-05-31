import { Theme } from "~/types/core"
import { UseUIStoreState } from "~/store/ui/types"

export interface UseUI {
  theme: {
    themes: Theme[]
    selected: Theme
  }
  authentication: {
    modal: {
      state: UseUIStoreState["authentication"]["modal"]
      open: () => void
      close: () => void
    }
  }
}
