// import type { UseUI } from "~/composables/useUI/types"

import { storeToRefs } from "pinia"
import { useUIStore } from "~/store/ui"
import { computed, readonly, useColorMode, watchEffect } from "#build/imports"
import { TONE } from "~/types/core"

export function useUI() {
  const mode = useColorMode()
  const store = storeToRefs(useUIStore())

  const authentication = {
    modal: {
      state: store.authentication.value.modal,
      open() {
        store.authentication.value.modal.isOpen = true
      },
      close() {
        store.authentication.value.modal.isOpen = false
      },
    },
  }

  const theme = {
    data: store.theme.value.data,
    get: computed(() => store.theme.value.selected),
    set: (value: string) => {
      mode.preference = value
      store.theme.value.selected = store.theme.value.data.find(theme => theme.value === value)
    },
    isDark: computed(() => store.theme.value.selected.tone === TONE.DARK),
  }

  watchEffect(() => {
    theme.set(mode.preference)
  })

  return {
    theme,
    authentication,
  }
}
