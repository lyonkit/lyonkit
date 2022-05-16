<script setup lang="ts">

</script>

<template>
  <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <div class="i-clarity:info-standard-solid h-5 w-5 text-blue-400" aria-hidden="true" />
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between text-justify">
        <p class="text-sm text-blue-700">
          <slot />
        </p>
        <p class="mt-3 text-sm md:mt-0 md:ml-6">
          <slot name="append" />
        </p>
      </div>
    </div>
  </div>
</template>
