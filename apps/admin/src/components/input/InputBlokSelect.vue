<script setup lang="ts">
import type { BlokIds } from '@lyonkit/bloks'
import { BlokMap } from '@lyonkit/bloks'

const props = defineProps<{ modelValue?: BlokIds }>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: BlokIds): void
}>()

const model = useVModel(props, 'modelValue', emit, { passive: true })

const Bloks = Object.values(BlokMap)
</script>

<template>
  <VRadioGroup v-model="model">
    <VRadio
      v-for="component in Bloks"
      :key="component.id"
      :value="component.id"
      :label="component.name"
      color="primary"
    />
  </VRadioGroup>
</template>
