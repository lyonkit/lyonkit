<script setup lang="ts">
import type { PageInput, PageOutput } from '@leo91000/lyonkit-client'

const emit = defineEmits<{
  (event: 'created', value: PageOutput): void
}>()
const { openToast } = useToast()
const lyonkit = useLyonkit()

const loading = ref(false)
async function onSubmit(page: PageInput) {
  if (loading.value)
    return
  loading.value = true

  try {
    const createdPage = await lyonkit.createPage(page)
    emit('created', createdPage)
  }
  catch (e) {
    console.error('An error occured while creating page', e)
    openToast({ message: 'Une erreur est survenue lors de la création de la page', type: 'error' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <FormPage :loading="loading" @submit="onSubmit" />
</template>
