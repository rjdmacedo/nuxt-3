<template>
  <Disclosure v-slot="{ open }" as="nav">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between h-16">
        <div class="hidden sm:-my-px sm:flex sm:items-center sm:space-x-8">
          <nuxt-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="h-8 inline-flex items-center px-1 border-b-2"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.name }}
          </nuxt-link>
        </div>

        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <ColorModeSwitcher class="mr-2" />

          <!-- Notification bell -->
          <button v-if="user" type="button" class="mr-2 rounded-full">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu v-if="user" as="div" class="relative flex-shrink-0">
            <MenuButton class="flex rounded-full">
              <span class="sr-only">Open user menu</span>
              <img
                v-if="user.image || imageUrl"
                :src="user.image || imageUrl"
                class="rounded-full h-8 w-8"
                :alt="`${user.firstName ?? 'User'} profile image`"
              />
              <UserIcon v-else class="h-6 w-6" aria-hidden="true" />
            </MenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="bg-base-100 z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 border border-base-300 shadow-2xl"
              >
                <MenuItem v-slot="{ active }">
                  <nuxt-link
                    :to="{ name: 'account-profile' }"
                    :class="[active ? 'bg-base-300' : '', 'block py-2 px-4 text-sm']"
                  >
                    My Account
                  </nuxt-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <span
                    :class="[active ? 'bg-base-300' : '', 'cursor-pointer block py-2 px-4 text-sm']"
                    @click="handleLogout"
                  >
                    Sign out
                  </span>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
          <div v-else>
            <button type="button" class="flex rounded-full" @click="handleUserIconClick">
              <span class="sr-only">Authenticate user</span>
              <UserIcon class="h-6 w-6" aria-hidden="true" />
            </button>
            <AuthenticationModal />
          </div>
        </div>

        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
            'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>

      <div v-if="user" class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="imageUrl" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">
              {{ user.firstName }}
            </div>
            <div class="text-sm font-medium text-gray-500">
              {{ user.email }}
            </div>
          </div>
          <button
            type="button"
            class="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            :href="item.href"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            {{ item.name }}
          </DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { onMounted, useRoute, useRouter } from "#imports"
import { BellIcon, MenuIcon, XIcon, UserIcon } from "@heroicons/vue/outline"
import { Disclosure, DisclosurePanel, DisclosureButton, Menu, MenuItem, MenuButton, MenuItems } from "@headlessui/vue"

import { useUI } from "@/composables/useUI"
import { useUser } from "@/composables/useUser"
import AuthenticationModal from "@/components/AuthenticationModal.vue"

const ui = useUI()
const route = useRoute()
const router = useRouter()
const { data: user, logout } = useUser()

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Profile", href: "/account/profile", current: false },
]

const userNavigation = [
  { name: "Your Profile", href: "/account/profile" },
  { name: "Sign out", href: "#" },
]

const handleLogout = () => {
  logout()
  router.push("/")
  ui.authentication.modal.open()
}

const imageUrl =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

const handleUserIconClick = () => {
  if (!user.value) {
    ui.authentication.modal.open()
  }
  return router.push("/account/profile")
}

onMounted(() => {
  if (route.query["auth-modal-opened"]) {
    ui.authentication.modal.open()
  }
})
</script>

<style lang="scss">
a:not([class^="router-link-exact-active"]) {
  @apply border-transparent;
}

a.router-link-active {
  @apply border-primary;
}
</style>
