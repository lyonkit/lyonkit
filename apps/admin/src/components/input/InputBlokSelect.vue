<script setup lang="ts">
import { ComponentsMap } from '@lyonkit/bloks'

type BloksId = keyof typeof ComponentsMap
const props = defineProps<{ modelValue?: BloksId }>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: BloksId): void
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
