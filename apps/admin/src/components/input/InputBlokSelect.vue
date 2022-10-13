<script setup lang="ts">
import type { BlokIds } from '@lyonkit/bloks'

const props = defineProps<{ modelValue?: BlokIds }>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: BlokIds): void
}>()

const model = useVModel(props, 'modelValue', emit, { passive: true })
</script>

<template>
  <VRadioGroup v-model="model">
    <VRadio
      v-for="component in ComponentsMap"
      :key="component.id"
      :value="component.id"
      :label="component.name"
      color="primary"
    />
  </VRadioGroup>
</template>
