<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const lyonkit = useLyonkit()
const { openToast } = useToast()

const path = computed(() => {
  if (Array.isArray(route.params.path))
    return `/${route.params.path.join('/')}`

  return `/${route.params.path}`
})

const { isLoading, state: page } = useAsyncState(() => lyonkit.getPage(path.value), null, {
  onError(e) {
    console.error('An error occurred while fetching page with blok', e)
    openToast({
      type: 'error',
      message: 'Une erreur est survenue lors de la récupération de la page',
    })
    router.push('/dashboard')
  },
})
</script>

<template>
  <VContainer>
    <h2 class="text-center text-h5 text-grey">
      {{ path }}
    </h2>
    <h1 class="text-center">
      {{ page?.title }}
    </h1>
    <p class="text-center text-h6 font-italic">
      {{ page?.description }}
    </p>
    <hr>
  </VContainer>
</template>
