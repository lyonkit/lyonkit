<script setup lang="ts">
import { ComponentsMap } from '@lyonkit/bloks'

const HelloWorld = ComponentsMap['#hello-world'].component
</script>

<template>
  <div>
    <p class="font-bold">
      Bold
    </p>
    <component
      :is="HelloWorld"
      :heading="4"
      template
    />
  </div>
</template>
