<script setup lang="ts">
import { mdiClose, mdiTrashCan } from '@mdi/js'
import type { PageOutput } from '@leo91000/lyonkit-client'

const props = defineProps<{
  pageId: number
}>()

const emit = defineEmits<{
  (event: 'delete', value: PageOutput): void
}>()

const router = useRouter()
const lyonkit = useLyonkit()
const { fetchPages } = usePageList()
const { openToast } = useToast()

const dialog = ref(false)
const loading = ref(false)
async function removePage() {
  if (loading.value)
    return

  loading.value = true
  try {
    await lyonkit.deletePage(props.pageId)
    router.push('/dashboard')
    await fetchPages()
  }
  catch (e) {
    console.error('An error occurred while removing page', e)
    openToast({
      type: 'error',
      message: 'Une erreur est survenue lors de la suppression de la page',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <VDialog v-model="dialog">
    <template #activator="{ props: btnProps }">
      <VBtn
        color="error"
        v-bind="btnProps"
        :prepend-icon="mdiTrashCan"
      >
        Supprimer
      </VBtn>
    </template>

    <VCard class="ma-4">
      <VCardTitle class="d-flex flex-row items_center justify-space-between">
        <div>Êtes-vous sûre de vouloir supprimer la page ?</div>
        <VBtn
          variant="flat"
          size="small"
          :icon="mdiClose"
          @click="dialog = false"
        />
      </VCardTitle>

      <VCardActions class="d-flex flex-row items-center justify-space-between">
        <VBtn
          color="error"
          :disabled="loading"
          :loading="loading"
          @click="removePage()"
        >
          Oui
        </VBtn>
        <VBtn :disabled="loading" @click="dialog = false">
          Non
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
