<script setup lang="ts">
withDefaults(defineProps<{
  size?: 1 | 2 | 3 | 4 | 5 | 6
}>(), {
  size: 1,
})
</script>

<template>
  <component
    :is="`h${size}`"
    class="purple"
  >
    Hello World !
  </component>
</template>

<style scoped>
.purple {
  color: #9c27b0;
}
</style>
