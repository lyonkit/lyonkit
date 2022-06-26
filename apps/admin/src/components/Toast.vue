<script setup lang="ts">
const { message, type, show, timeout } = useToast()
</script>

<template>
  <VSnackbar
    v-model="show"
    :color="type"
    :timeout="timeout"
  >
    {{ message }}
  </VSnackbar>
</template>
