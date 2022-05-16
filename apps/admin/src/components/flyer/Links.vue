<script setup lang="ts">
import type { MenuItem } from '~/composables/menu'
import type { Icon } from '~/types/utils'

const props = withDefaults(
  defineProps<{
    links: MenuItem[]
    title: string
    icon: Icon
    active?: boolean
    modelValue?: boolean
  }>(),
  {
    modelValue: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const model = useVModel(props, 'modelValue', emit, { passive: true })
const toggle = useToggle(model)
</script>

<template>
  <div>
    <BtnPrimary
      size="lg"
      :icon="icon"
      class="w-full"
      :active="active"
      @click="toggle()"
    >
      {{ title }}

      <template #append>
        <div class="i-ic:outline-keyboard-arrow-right transition-all" :class="{ 'rotate-90': model }" />
      </template>
    </BtnPrimary>

    <TransitionCollapseExpandY>
      <div v-if="model" class="border-t border-primary">
        <BtnPrimary
          v-for="(link, i) in links"
          :key="`FlyerLink${i}`"
          class="w-full pl-6"
          :to="link.to"
          :icon="link.icon"
        >
          {{ link.title }}
        </BtnPrimary>
      </div>
    </TransitionCollapseExpandY>
  </div>
</template>
