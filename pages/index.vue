<template>
  <div>
    <div class="flex">
      <button class="btn btn-info" @click="() => pushNotification('info')">Info</button>
      <button class="btn btn-error ml-2" @click="() => pushNotification('error')">Error</button>
      <button class="btn btn-success ml-2" @click="() => pushNotification('success')">Success</button>
      <button class="btn btn-warning ml-2" @click="() => pushNotification('warning')">Warning</button>
    </div>

    Theme name: {{ theme.name }}
    <br />
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur dolore eligendi exercitationem
    expedita fuga id illum incidunt inventore iste laborum, natus necessitatibus pariatur possimus quae, sit tenetur
    veniam. Eos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur dolore eligendi
    exercitationem expedita fuga id illum incidunt inventore iste laborum, natus necessitatibus pariatur possimus quae,
    sit tenetur veniam. Eos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur dolore
    eligendi exercitationem expedita fuga id illum incidunt inventore iste laborum, natus necessitatibus pariatur
    possimus quae, sit tenetur veniam. Eos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
    aspernatur dolore eligendi exercitationem expedita fuga id illum incidunt inventore iste laborum, natus
    necessitatibus pariatur possimus quae, sit tenetur veniam. Eos! Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Asperiores aspernatur dolore eligendi exercitationem expedita fuga id illum incidunt inventore iste laborum,
    natus necessitatibus pariatur possimus quae, sit tenetur veniam. Eos! Lorem ipsum dolor sit amet, consectetur
    adipisicing elit. Asperiores aspernatur dolore eligendi exercitationem expedita fuga id illum incidunt inventore
    iste laborum, natus necessitatib
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, useNotification, useUI } from "#imports"

definePageMeta({
  layout: "default",
})

const { theme } = useUI()
const { notify } = useNotification()

function pushNotification(type: "success" | "info" | "warning" | "error") {
  notify({
    type,
    dismissible: true,
    message:
      "dolore eligendi exercitationem expedita fuga id illum incidunt inventore iste laborum, natus necessitatibus",
  })
}
</script>
