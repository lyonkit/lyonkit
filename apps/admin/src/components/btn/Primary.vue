<script setup lang="ts">
import type { Icon } from '~/types/utils'

const props = withDefaults(
  defineProps<{
    icon?: Icon
    size?: keyof typeof sizesClasses['btn']
    active?: boolean
    appendIcon?: Icon
    to?: string
    rounded?: boolean
  }>(),
  { size: 'base', rounded: false },
)

const sizesClasses = {
  btn: {
    base: 'p-2.5',
    lg: 'p-3',
  },
  root: {
    base: 'gap-2',
    lg: 'text-lg gap-2',
  },
  icon: {
    base: 'w-5 h-5',
    lg: 'w-6 h-6',
  },
}

const properties = computed(() => {
  if (props.to) {
    return {
      component: resolveComponent('NuxtLink'),
      binds: {
        to: props.to,
        activeClass: 'bg-primary-400',
      },
    }
  }

  return { component: 'button' }
})
</script>

<template>
  <component
    :is="properties.component"
    v-bind="properties.binds"
    :class="`flex ${sizesClasses.btn[size]} ${active ? 'bg-primary-400' : 'bg-primary'} ${rounded ? 'rounded-lg' : ''} hover:bg-primary-400 transition-all items-center justify-between text-white`"
  >
    <div :class="`flex ${sizesClasses.root[size]} items-center`">
      <div v-if="icon" :class="`${icon} ${sizesClasses.icon[size]}`" />
      <slot />
    </div>

    <slot v-if="$slots.append" name="append" />
    <div v-else-if="appendIcon" :class="appendIcon" />
  </component>
</template>
