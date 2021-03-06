<template>
  <TransitionRoot appear :show="ui.authentication.modal.state.isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="handleModalClose">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 text-left align-middle shadow-xl transition-all"
            >
              <div class="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-md">
                  <img
                    class="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <h2 class="mt-6 text-center text-2xl font-extrabold">Sign in or create an account</h2>
                </div>

                <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <form class="space-y-6" @submit.prevent="submitForm">
                    <div>
                      <label for="email" class="block text-sm font-medium">{{ ui.theme.isDark }}</label>
                      <div class="mt-1">
                        <input
                          required
                          id="email"
                          type="email"
                          v-model="email"
                          autocomplete="email"
                          class="input block w-full px-3 py-2"
                          :class="[ui.theme.isDark.value ? 'bg-base-300' : 'border border-2 border-base-300']"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      :class="{ 'loading cursor-not-allowed': loading }"
                      class="w-full btn btn-primary"
                    >
                      {{ loading ? "Sending..." : "Email me a login link" }}
                    </button>
                  </form>

                  <div class="mt-6">
                    <div class="relative">
                      <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-indigo-300" />
                      </div>
                      <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-base-100"> Or continue with </span>
                      </div>
                    </div>

                    <div class="mt-6 grid grid-cols-3 gap-3">
                      <nuxt-link to="#" class="btn btn-secondary">
                        <span class="sr-only">Sign in with Facebook</span>
                        <svg class="w-5 h-5" aria-hidden="true" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </nuxt-link>

                      <nuxt-link to="#" class="btn btn-secondary">
                        <span class="sr-only">Sign in with Twitter</span>
                        <svg class="w-5 h-5" aria-hidden="true" viewBox="0 0 20 20">
                          <path
                            d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                          />
                        </svg>
                      </nuxt-link>

                      <nuxt-link to="#" class="btn btn-secondary">
                        <span class="sr-only">Sign in with GitHub</span>
                        <svg class="w-5 h-5" aria-hidden="true" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { useUser, useState, useRouter, useUI, useRoute } from "#imports"
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from "@headlessui/vue"

const route = useRoute()
const router = useRouter()
const email = useState("email", () => "rmacedo@vuestorefront.io")

const ui = useUI()
const { loading, sendToken } = useUser()

const handleModalClose = () => {
  ui.authentication.modal.close()
  const query = Object.assign({}, route.query)
  delete query["auth-modal-opened"]
  router.replace({ query })
}

const submitForm = async () => {
  await sendToken({ email: email.value })
  ui.authentication.modal.close()
  await router.push({
    name: "authenticate",
    query: {
      email: email.value,
    },
  })
}
</script>
