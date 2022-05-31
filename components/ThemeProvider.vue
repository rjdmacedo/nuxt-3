<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Listbox as="div" v-model="mode.preference">
    <ListboxLabel class="block text-sm font-medium">Theme</ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton
        class="relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <span class="block truncate">
          {{ ui.theme.get.value.name }}
        </span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon class="h-5 w-5" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 w-full shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            :key="theme.value"
            v-for="theme in ui.theme.data"
            :value="theme.value"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'text-white hover:bg-primary' : '',
                'cursor-pointer select-none relative py-2 pl-3 pr-9 bg-base-100',
              ]"
            >
              <span
                class="'block truncate'"
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  ui.theme.isDark.value ? 'text-white' : 'text-gray-900',
                ]"
              >
                {{ theme.name }}
              </span>

              <span
                v-if="selected"
                class="absolute inset-y-0 right-0 flex items-center pr-4"
                :class="[active ? 'text-white' : ui.theme.isDark.value ? 'text-white' : 'text-indigo-600']"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { useUI, useColorMode } from "#imports"
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid"
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from "@headlessui/vue"

const ui = useUI()
const mode = useColorMode()
</script>
