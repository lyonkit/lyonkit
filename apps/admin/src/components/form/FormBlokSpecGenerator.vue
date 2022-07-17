<script setup lang="ts">
import type { BlokOutput } from '@leo91000/lyonkit-client'
import { ComponentsMap } from '@lyonkit/bloks'
import { mdiClose } from '@mdi/js'

const props = defineProps<{
  blok: BlokOutput
}>()

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'done', payload: BlokOutput): void
}>()

const lyonkit = useLyonkit()
const { openToast } = useToast()

const inputs = computed(() => {
  const spec = ComponentsMap[props.blok.componentId as keyof typeof ComponentsMap]
  const inputs: { name: string; component: ReturnType<typeof resolveComponent>; props: Record<string, any> }[] = []
  if (!spec)
    return inputs

  for (const name in spec.props) {
    const prop = spec.props[name]
    switch (prop.type) {
      case 'select':
        inputs.push({ name, component: resolveComponent('VSelect'), props: { items: prop.options, label: prop.label } })
    }
  }

  return inputs
})

const values = reactive({ ...props.blok.props })
watch(() => props.blok.props, (newProps) => {
  for (const name in newProps)
    values[name] = newProps[name]

  for (const name in values) {
    if (!(name in newProps))
      delete values[name]
  }
}, { deep: true })
function onInput(name: string, value: any) {
  values[name] = value
}

const loading = ref(false)
async function onSubmit() {
  if (!loading.value) {
    loading.value = true
    try {
      const udpatedBlok = await lyonkit.patchBlok({ blokId: props.blok.id, patch: { props: values } })
      emit('done', udpatedBlok)
    }
    catch (e) {
      openToast({ message: 'Une erreur est survenue lors de la mise à jour du blok', type: 'error' })
      console.error('An error occurred while updating blok', e)
    }
    finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <VCard :min-width="700" class="pa-4">
    <VCardTitle class="d-flex items-center justify-space-between">
      <div>Modifier un blok</div>
      <VBtn
        flat
        :icon="mdiClose"
        @click="$emit('close')"
      />
    </VCardTitle>

    <VForm @submit.prevent="onSubmit()">
      <component
        :is="input.component"
        v-for="input in inputs"
        :key="`Input${input.name}`"
        v-bind="input.props"
        :model-value="values[input.name]"
        @update:model-value="onInput(input.name, $event)"
      />

      <VCardActions class="d-flex items-center justify-space-between">
        <VBtn
          type="submit"
          color="info"
          :loading="loading"
          :disabled="loading"
        >
          Modifier
        </VBtn>
        <VBtn color="error">
          Annuler
        </VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
