<script setup lang="ts">
import type { MenuItem } from '~/composables/menu'
import type { Icon } from '~/types/utils'
import { longestCommonPrefix } from '~/utils/string'

const props = defineProps<{ title: string; icon: Icon; items: MenuItem[]; commonPath?: string }>()

const route = useRoute()

const commonPath = computed(() => props.commonPath || longestCommonPrefix(props.items.map(item => item.to)))

const isActive = computed(() => route.matched.some(({ path }) => {
  return commonPath.value ? path.startsWith(commonPath.value) : false
}))
</script>

<template>
  <FlyerLinks
    :active="isActive"
    :model-value="isActive"
    :links="items"
    :title="title"
    :icon="icon"
  />
</template>
