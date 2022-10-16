<script setup lang="ts">
import { BlokMap } from '@lyonkit/bloks'

const HelloWorld = BlokMap['#hello-world'].component
</script>

<template>
  <div>
    <p class="font-bold">
      Bold
    </p>
    <HelloWorld
      :heading="4"
    />
  </div>
</template>
