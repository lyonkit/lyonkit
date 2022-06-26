<script setup lang="ts">
const route = useRoute()

const path = computed(() => {
  if (Array.isArray(route.params.path))
    return `/${route.params.path.join('/')}`

  return `/${route.params.path}`
})
</script>

<template>
  <div>
    Page details for {{ path }}
  </div>
</template>
