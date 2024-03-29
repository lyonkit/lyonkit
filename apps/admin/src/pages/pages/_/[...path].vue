<script setup lang="ts">
import type { BlokOutput, PageOutput, PageOutputWithBloks } from '@leo91000/lyonkit-client'
import { BlokRenderer } from '@lyonkit/bloks'

const router = useRouter()
const route = useRoute()
const { getPage } = useLyonkit()
const { openToast } = useToast()
const { fetchPages } = usePageList()

const path = computed(() => {
  if (Array.isArray(route.params.path))
    return `/${route.params.path.join('/')}`

  return `/${route.params.path}`
})

const page = ref<PageOutputWithBloks>()
async function refreshPage() {
  try {
    page.value = await getPage(path.value)
  }
  catch (e) {
    console.error('An error occurred while fetching page with blok', e)
    openToast({
      type: 'error',
      message: 'Une erreur est survenue lors de la récupération de la page',
    })
    router.push('/dashboard')
  }
}
onMounted(async () => refreshPage())

async function onPageUpdated(page: PageOutput) {
  const promises: Promise<any>[] = [fetchPages()]

  const pagePath = `/pages/i${page.path}`
  if (route.path !== pagePath)
    router.push(pagePath)
  else
    promises.push(refreshPage())

  await Promise.all(promises)
}

const editDialogParams = reactive({
  dialog: false,
  i: 0,
  blok: null as unknown as BlokOutput,
})
function openEditDialog(i: number) {
  const blok = page.value?.bloks[i]
  if (!blok)
    return

  editDialogParams.i = i
  editDialogParams.blok = blok
  editDialogParams.dialog = true
}
async function onBlokEdited() {
  editDialogParams.dialog = false
  await refreshPage()
}
</script>

<template>
  <VContainer>
    <div v-if="!page">
      Loading...
    </div>

    <template v-else>
      <VCard
        class="pa-4"
        elevation="2"
      >
        <h2 class="text-center text-h5 text-grey">
          {{ path }}
        </h2>
        <h1 class="text-center">
          {{ page?.title }}
        </h1>
        <p class="text-center text-h6 font-italic">
          {{ page?.description }}
        </p>
        <div class="d-flex flex-row items-center justify-center my-4">
          <BtnUpdatePage
            :page="page"
            @updated="onPageUpdated"
          />

          <BtnRemovePage :page-id="page.id" />
        </div>
      </VCard>

      <VRow
        align="center"
        justify="center"
        class="mt-4 mb-8"
      >
        <BtnBlokSelect :page-id="page.id" @created="refreshPage()" />
      </VRow>

      <VRow class="pr-8 pl-4">
        <BlokRenderer
          :bloks="page.bloks"
          editor-mode
          @edit="openEditDialog"
        />
      </VRow>

      <VDialog v-model="editDialogParams.dialog">
        <FormBlokSpecGenerator
          :blok="editDialogParams.blok"
          @close="editDialogParams.dialog = false"
          @done="onBlokEdited()"
        />
      </VDialog>
    </template>
  </VContainer>
</template>
