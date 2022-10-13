<script setup lang="ts">
import type { BlokIds } from '@lyonkit/bloks'
import { BlokMap } from '@lyonkit/bloks'
import { mdiCheck, mdiClose, mdiPlus } from '@mdi/js'
import { mapValues } from 'lodash-es'
import type { BlokOutput } from '@leo91000/lyonkit-client'

const props = defineProps<{ pageId: number }>()
const emit = defineEmits<{
  (event: 'created', blok: BlokOutput): void
}>()

const input = ref<BlokIds>()
const [dialog, toggleDialog] = useToggle(false)

const { openToast } = useToast()
const lyonkit = useLyonkit()
const loading = ref(false)
async function createBlok() {
  if (!input.value || loading.value)
    return

  loading.value = true

  try {
    const defaultProps = mapValues(BlokMap[input.value].props, prop => prop.default)
    const blokOutput = await lyonkit.createBlok({
      pageId: props.pageId,
      props: defaultProps,
      componentId: input.value,
    })
    toggleDialog(false)
    emit('created', blokOutput)
  }
  catch (e) {
    openToast({
      type: 'error',
      message: 'Une erreur est survenue lors de la création du blok',
    })
    console.error('An error occurred while creating blok', e)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <VDialog v-model="dialog">
    <template #activator="{ props: btnProps }">
      <VBtn :prepend-icon="mdiPlus" v-bind="btnProps">
        Ajouter un blok
      </VBtn>
    </template>

    <VCard min-width="500">
      <VCardTitle class="d-flex flex-row items-center justify-space-between">
        <span>
          Veuillez sélectionner un blok
        </span>
        <VBtn
          :icon="mdiClose"
          flat
          @click="toggleDialog(false)"
        />
      </VCardTitle>

      <InputBlokSelect v-model="input" class="mx-4" />

      <VCardActions>
        <VBtn
          color="!input ? undefined : 'success'"
          :disabled="!input"
          :loading="loading"
          class="d-block mx-auto"
          @click="createBlok()"
        >
          <VIcon :icon="mdiCheck" />
          Valider
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
