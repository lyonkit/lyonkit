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
    class="text-purple-400"
  >
    Hello World !
  </component>
</template>
