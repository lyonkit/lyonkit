<script setup lang="ts">
import { mdiClose, mdiPencil } from '@mdi/js'
import type { PageOutput } from '@leo91000/lyonkit-client'

const props = defineProps<{
  page: PageOutput
}>()

const emit = defineEmits<{
  (event: 'updated', value: PageOutput): void
}>()

const dialog = ref(false)

async function onPageUpdated(page: PageOutput) {
  dialog.value = false
  emit('updated', page)
}
</script>

<template>
  <VDialog v-model="dialog">
    <template #activator="{ props: btnProps }">
      <VBtn
        color="info"
        v-bind="btnProps"
        :prepend-icon="mdiPencil"
        class="mr-2"
      >
        Modifier
      </VBtn>
    </template>

    <VCard class="pa-3">
      <VCardTitle class="d-flex flew-row items-center justify-space-between mb-2">
        <div>Mise à jour des métadonnées de la page</div>
        <VBtn
          variant="flat"
          size="small"
          :icon="mdiClose"
          @click="dialog = false"
        />
      </VCardTitle>
      <FormUpdatePage
        class="ma-4"
        :page="page"
        @updated="onPageUpdated"
      />
    </VCard>
  </VDialog>
</template>
