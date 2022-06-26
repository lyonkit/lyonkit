<script setup lang="ts">
import type { PageInput, PageOutput } from '@leo91000/lyonkit-client'

const props = defineProps<{ page: PageOutput }>()

const emit = defineEmits<{
  (event: 'updated', value: PageOutput): void
}>()

const model = ref<PageInput>({ path: props.page.path, title: props.page.title, description: props.page.description })
watch(() => props.page, (value) => {
  model.value = { path: value.path, title: value.title, description: value.description }
})

const { openToast } = useToast()
const lyonkit = useLyonkit()

const loading = ref(false)
async function onSubmit(page: PageInput) {
  if (loading.value)
    return
  loading.value = true

  try {
    const updatedPage = await lyonkit.updatePage({ pageId: props.page.id, update: page })
    emit('updated', updatedPage)
  }
  catch (e) {
    console.error('An error occured while updating page', e)
    openToast({ message: 'Une erreur est survenue lors de la mise à jour de la page', type: 'error' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <FormPage
    v-model="model"
    :loading="loading"
    button-text="Mettre à jour"
    @submit="onSubmit"
  />
</template>
