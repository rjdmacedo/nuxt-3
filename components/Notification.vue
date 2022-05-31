<template>
  <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <transition-group
        tag="div"
        name="fade"
        leave-to-class="opacity-0"
        leave-from-class="opacity-100"
        leave-active-class="transition ease-in duration-300"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        class="max-w-sm w-full rounded-lg pointer-events-auto overflow-hidden"
      >
        <div
          :key="notification.id"
          v-for="notification in queue"
          :class="{
            'border-blue-500 bg-blue-50/80': notification.type === 'info',
            'border-teal-500 bg-teal-50/80': notification.type === 'success',
            'border-yellow-500 bg-yellow-50/80': notification.type === 'warning',
            'border-red-400 bg-red-50/80': notification.type === 'error',
          }"
          class="backdrop-blur-sm p-4 mb-4 border rounded-2xl"
        >
          <div class="flex items-center items-start">
            <div class="flex-shrink-0">
              <CheckCircleIcon
                v-if="notification.type === 'success'"
                class="h-7 w-7 text-teal-500"
                aria-hidden="true"
              />
              <InformationCircleIcon
                v-if="notification.type === 'info'"
                class="h-7 w-7 text-blue-500"
                aria-hidden="true"
              />
              <ExclamationCircleIcon
                v-if="notification.type === 'warning'"
                class="h-7 w-7 text-yellow-500"
                aria-hidden="true"
              />
              <XCircleIcon v-if="notification.type === 'error'" class="h-7 w-7 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p v-if="notification.title" class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
              <p class="text-sm text-gray-500" :class="{ 'mt-1': notification.title }">{{ notification.message }}</p>
            </div>
            <div v-if="notification.dismissible" class="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                @click="notification.onDismiss"
                class="rounded-full inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close</span>
                <XIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from "#imports"
import { XIcon } from "@heroicons/vue/solid"
import { CheckCircleIcon, InformationCircleIcon, ExclamationCircleIcon, XCircleIcon } from "@heroicons/vue/outline"

const { queue } = useNotification()
</script>
