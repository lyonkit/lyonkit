<script setup lang="ts">
import type { MenuGroup } from '~/composables/menu'

defineProps<{
  title: string
  collection: MenuGroup[]
}>()
</script>

<template>
  <div>
    <h2 class="text-primary-200 px-3 line-after text-sm uppercase mt-8 mb-4">
      {{ title }}
    </h2>

    <LayoutNavbarMenuGroup
      v-for="(group, i) in collection"
      v-bind="group"
      :key="`nested_menu_group_${i}`"
    />
  </div>
</template>
