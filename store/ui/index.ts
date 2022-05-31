import type { UseUIStore, UseUIStoreState } from "~/store/ui/types"

import { TONE } from "~/types/core"
import { defineStore } from "pinia"

const themes = [
  { tone: TONE.DARK, name: "Dark", value: "dark" },
  { tone: TONE.LIGHT, name: "Light", value: "light" },
]

export const useUIStore = (): UseUIStore => {
  return defineStore("ui", {
    state: (): UseUIStoreState => ({
      theme: {
        data: themes,
        selected: null,
      },
      authentication: {
        modal: {
          isOpen: false,
        },
      },
    }),
  })()
}
