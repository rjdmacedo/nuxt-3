<template>
  <div class="rounded-lg shadow overflow-hidden">
    <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
      <aside class="py-6 lg:col-span-3">
        <ThemeProvider class="p-3" />

        <nav class="space-y-1">
          <nuxt-link
            :to="item.href"
            :key="item.name"
            v-for="item in subNavigation"
            :aria-current="item.current ? 'page' : undefined"
            class="group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          >
            <component
              :is="item.icon"
              aria-hidden="true"
              :class="[item.current ? 'text-primary' : 'text-secondary', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6']"
            />
            <span class="truncate">
              {{ item.name }}
            </span>
          </nuxt-link>
        </nav>
      </aside>

      <form class="divide-y divide-gray-200 lg:col-span-9" @click.prevent>
        <!-- Profile section -->
        <div class="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 class="text-lg leading-6 font-medium">Profile</h2>
            <p class="mt-1 text-sm">This information will be displayed publicly so be careful what you share.</p>
          </div>

          <div class="mt-6 flex flex-col lg:flex-row">
            <div class="flex-grow space-y-6">
              <div>
                <label for="email" class="label">Email</label>
                <input
                  disabled
                  id="email"
                  type="email"
                  :value="user.email"
                  class="mt-1 input input-bordered input-sm w-full"
                />
              </div>

              <div>
                <label for="about" class="label"> About </label>
                <div class="mt-1">
                  <textarea id="about" name="about" rows="3" class="mt-1 w-full textarea textarea-bordered" />
                </div>
                <p class="mt-2 text-sm">Brief description for your profile. URLs are hyperlinked.</p>
              </div>
            </div>

            <div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
              <p class="text-sm font-medium" aria-hidden="true">Photo</p>
              <div class="mt-1 lg:hidden">
                <div class="flex items-center">
                  <div class="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12" aria-hidden="true">
                    <img class="rounded-full h-full w-full" :src="imageUrl" alt="" />
                  </div>
                  <div class="ml-5 rounded-md shadow-sm">
                    <div
                      class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500"
                    >
                      <label for="mobile-user-photo" class="relative text-sm leading-4 font-medium pointer-events-none">
                        <span>Change</span>
                        <span class="sr-only"> user photo</span>
                      </label>
                      <input
                        id="mobile-user-photo"
                        name="user-photo"
                        type="file"
                        class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="hidden relative rounded-full overflow-hidden lg:block">
                <img class="relative rounded-full w-40 h-40" :src="imageUrl" alt="" />
                <label
                  for="desktop-user-photo"
                  class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                >
                  <span>Change</span>
                  <span class="sr-only"> user photo</span>
                  <input
                    type="file"
                    id="desktop-user-photo"
                    name="user-photo"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                  />
                </label>
              </div>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-12 gap-6">
            <div class="col-span-12 sm:col-span-6">
              <label for="first-name" class="label">First name</label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                :value="user.firstName"
                autocomplete="given-name"
                class="mt-1 input input-bordered input-sm w-full"
              />
            </div>

            <div class="col-span-12 sm:col-span-6">
              <label for="last-name" class="label">Last name</label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                :value="user.lastName"
                autocomplete="family-name"
                class="mt-1 input input-bordered input-sm w-full"
              />
            </div>

            <div class="col-span-12">
              <label for="url" class="label">URL</label>
              <input type="text" name="url" id="url" class="mt-1 input input-bordered input-sm w-full" />
            </div>

            <div class="col-span-12 sm:col-span-6">
              <label for="company" class="label">Company</label>
              <input
                type="text"
                name="company"
                id="company"
                autocomplete="organization"
                class="mt-1 input input-bordered input-sm w-full"
              />
            </div>
          </div>
        </div>

        <!-- Privacy section -->
        <div class="pt-6 divide-y">
          <div class="px-4 sm:px-6">
            <div>
              <h2 class="text-lg leading-6 font-medium">Privacy</h2>
              <p class="mt-1 text-sm">Ornare eu a volutpat eget vulputate. Fringilla commodo amet.</p>
            </div>
            <ul role="list" class="mt-2 divide-y divide-gray-200">
              <SwitchGroup as="li" class="py-4 flex items-center justify-between">
                <div class="flex flex-col">
                  <SwitchLabel as="p" class="text-sm font-medium" passive> Available to hire </SwitchLabel>
                  <SwitchDescription class="text-sm">
                    Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                  </SwitchDescription>
                </div>
                <Switch
                  v-model="availableToHire"
                  :class="[
                    availableToHire ? 'bg-teal-500' : 'bg-gray-200',
                    'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
                  ]"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      availableToHire ? 'translate-x-5' : 'translate-x-0',
                      'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                    ]"
                  />
                </Switch>
              </SwitchGroup>
              <SwitchGroup as="li" class="py-4 flex items-center justify-between">
                <div class="flex flex-col">
                  <SwitchLabel as="p" class="text-sm font-medium" passive> Make account private </SwitchLabel>
                  <SwitchDescription class="text-sm">
                    Pharetra morbi dui mi mattis tellus sollicitudin cursus pharetra.
                  </SwitchDescription>
                </div>
                <Switch
                  v-model="privateAccount"
                  :class="[
                    privateAccount ? 'bg-teal-500' : 'bg-gray-200',
                    'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
                  ]"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      privateAccount ? 'translate-x-5' : 'translate-x-0',
                      'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                    ]"
                  />
                </Switch>
              </SwitchGroup>
              <SwitchGroup as="li" class="py-4 flex items-center justify-between">
                <div class="flex flex-col">
                  <SwitchLabel as="p" class="text-sm font-medium" passive> Allow commenting </SwitchLabel>
                  <SwitchDescription class="text-sm">
                    Integer amet, nunc hendrerit adipiscing nam. Elementum ame
                  </SwitchDescription>
                </div>
                <Switch
                  v-model="allowCommenting"
                  :class="[
                    allowCommenting ? 'bg-teal-500' : 'bg-gray-200',
                    'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
                  ]"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      allowCommenting ? 'translate-x-5' : 'translate-x-0',
                      'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                    ]"
                  />
                </Switch>
              </SwitchGroup>
              <SwitchGroup as="li" class="py-4 flex items-center justify-between">
                <div class="flex flex-col">
                  <SwitchLabel as="p" class="text-sm font-medium" passive> Allow mentions </SwitchLabel>
                  <SwitchDescription class="text-sm">
                    Adipiscing est venenatis enim molestie commodo eu gravid
                  </SwitchDescription>
                </div>
                <Switch
                  v-model="allowMentions"
                  :class="[
                    allowMentions ? 'bg-teal-500' : 'bg-gray-200',
                    'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
                  ]"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      allowMentions ? 'translate-x-5' : 'translate-x-0',
                      'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                    ]"
                  />
                </Switch>
              </SwitchGroup>
            </ul>
          </div>

          <!-- CTA -->
          <div class="mt-4 py-4 px-4 flex justify-end sm:px-6 space-x-4">
            <button type="button" class="btn btn-ghost w-32">Cancel</button>
            <button type="submit" class="btn glass w-32">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser, definePageMeta, useState, useUI } from "#imports"
import { Switch, SwitchGroup, SwitchLabel, SwitchDescription } from "@headlessui/vue"
import { KeyIcon, BellIcon, CreditCardIcon, UserCircleIcon } from "@heroicons/vue/outline"

const { data: user } = useUser()

const allowMentions = useState("allowMentions", () => false)
const privateAccount = useState("privateAccount", () => false)
const allowCommenting = useState("allowCommenting", () => false)
const availableToHire = useState("availableToHire", () => false)

const subNavigation = [
  { name: "Profile", href: "/account/profile", icon: UserCircleIcon, current: true },
  { name: "Password", href: "/account/password", icon: KeyIcon, current: false },
  { name: "Notifications", href: "/account/notifications", icon: BellIcon, current: false },
  { name: "Billing", href: "/account/billing", icon: CreditCardIcon, current: false },
]

const imageUrl =
  "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"

definePageMeta({
  middleware: ["auth"],
})
</script>

<style lang="scss">
#wrapper {
  min-height: calc(100vh - 64px);
}
</style>
