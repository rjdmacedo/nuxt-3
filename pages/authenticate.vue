<template>
  <div class="h-screen flex justify-center items-center">
    <form class="border border-grey-500 p-4 rounded-2xl w-96" @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="token" class="block text-sm font-medium">Token</label>
        <div class="mt-1">
          <input
            required
            autofocus
            id="token"
            type="text"
            name="token"
            v-model="token"
            autocomplete="token"
            class="input block w-full px-3 py-2"
            :class="[ui.theme.isDark.value ? 'bg-base-300' : 'border border-2 border-base-300']"
          />
        </div>
      </div>

      <span class="text-red-500 text-lg" v-if="error.authenticate">Error: {{ error.authenticate }}</span>

      <button type="submit" :class="{ 'loading cursor-not-allowed': loading }" class="mt-4 w-full btn btn-primary">
        {{ loading ? "Authenticating..." : "Authenticate" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, useRouter, useRoute, useState, useUser, onMounted, useNotification, useUI } from "#imports"

definePageMeta({
  layout: false,
})

const route = useRoute()
const router = useRouter()

const token = useState("token", () => "")

const ui = useUI()
const { data: user } = useUser()
const { notify } = useNotification()
const { loading, authenticate, error } = useUser()

const submitForm = async () => {
  await authenticate({
    token: token.value,
    email: route.query.email as string,
  })
  if (!error.value.authenticate) {
    notify({
      type: "success",
      title: user.value.firstName ? `Welcome back, ${user.value.firstName}!` : "Welcome!",
      message: `You are now authenticated`,
    })
    await router.push({
      name: user.value.firstName ? "index" : "account-profile",
    })
  }
}

onMounted(() => {
  token.value = ""
})
</script>
