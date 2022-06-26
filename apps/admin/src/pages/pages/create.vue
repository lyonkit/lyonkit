<script setup lang="ts">
import type { PageOutput } from '@leo91000/lyonkit-client'

const router = useRouter()

function onPageCreated(page: PageOutput) {
  router.push(`/pages/i${page.path}`)
}
</script>

<template>
  <VContainer>
    <h1 class="text-center my-4">
      Ajouter une page
    </h1>
    <FormCreatePage @created="onPageCreated" />
  </VContainer>
</template>
