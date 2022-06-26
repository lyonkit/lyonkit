<script setup lang="ts">
import { mdiClose, mdiPencil, mdiPlus, mdiTrashCan } from '@mdi/js'
import type { PageOutput } from '@leo91000/lyonkit-client'

const router = useRouter()
const route = useRoute()
const lyonkit = useLyonkit()
const { openToast } = useToast()
const { fetchPages } = usePageList()

const path = computed(() => {
  if (Array.isArray(route.params.path))
    return `/${route.params.path.join('/')}`

  return `/${route.params.path}`
})

const { isLoading, state: page, execute: refreshPage } = useAsyncState(() => lyonkit.getPage(path.value), null, {
  onError(e) {
    console.error('An error occurred while fetching page with blok', e)
    openToast({
      type: 'error',
      message: 'Une erreur est survenue lors de la récupération de la page',
    })
    router.push('/dashboard')
  },
})

const update = reactive({
  showModal: false,
  page: null as PageOutput | null,
})
function openUpdateModal(page: PageOutput) {
  update.page = page
  update.showModal = true
}
function closeUpdateModal() {
  update.showModal = false
}

async function onPageUpdated(page: PageOutput) {
  closeUpdateModal()
  const promises: Promise<any>[] = [fetchPages()]
  const pagePath = `/pages/i${page.path}`
  if (route.path !== pagePath)
    router.push(pagePath)
  else
    promises.push(refreshPage())

  await Promise.all(promises)
}

const remove = reactive({
  showModal: false,
  page: null as PageOutput | null,
  loading: false,
})
function openRemoveModal(page: PageOutput) {
  remove.page = page
  remove.showModal = true
}
function closeRemoveModal() {
  remove.showModal = false
}
async function removePage() {
  if (remove.loading || !remove.page)
    return

  remove.loading = true
  try {
    await lyonkit.deletePage(remove.page.id)
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
    remove.loading = false
  }
}
</script>

<template>
  <VContainer>
    <VDialog v-model="update.showModal">
      <VCard class="pa-3">
        <VCardTitle class="d-flex flew-row items-center justify-space-between mb-2">
          <div>Mise à jour des métadonnées de la page</div>
          <VBtn
            variant="flat"
            size="small"
            :icon="mdiClose"
            @click="closeUpdateModal()"
          />
        </VCardTitle>
        <FormUpdatePage
          v-if="update.page"
          class="ma-4"
          :page="update.page"
          @updated="onPageUpdated"
        />
        <div v-else>
          Render error
        </div>
      </VCard>
    </VDialog>

    <VDialog v-model="remove.showModal">
      <VCard
        v-if="remove.page"
        class="ma-4"
        :page="remove.page"
      >
        <VCardTitle class="d-flex flex-row items_center justify-space-between">
          <div>Êtes-vous sûre de vouloir supprimer la page ?</div>
          <VBtn
            variant="flat"
            size="small"
            :icon="mdiClose"
            @click="closeRemoveModal()"
          />
        </VCardTitle>

        <VCardActions class="d-flex flex-row items-center justify-space-between">
          <VBtn
            color="error"
            :disabled="remove.loading"
            :loading="remove.loading"
            @click="removePage()"
          >
            Oui
          </VBtn>
          <VBtn :disabled="remove.loading" @click="closeRemoveModal()">
            Non
          </VBtn>
        </VCardActions>
      </VCard>
      <div v-else>
        Render error
      </div>
    </VDialog>

    <div v-if="isLoading">
      Loading...
    </div>
    <VCard
      v-else
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
        <VBtn
          :prepend-icon="mdiPencil"
          color="info"
          class="mr-2"
          @click="openUpdateModal(page)"
        >
          Modifier
        </VBtn>
        <VBtn
          :prepend-icon="mdiTrashCan"
          color="error"
          @click="openRemoveModal(page)"
        >
          Supprimer
        </VBtn>
      </div>
    </VCard>

    <VRow
      align="center"
      justify="center"
      class="mt-4"
    >
      <VBtn :prepend-icon="mdiPlus">
        Ajouter un blok
      </VBtn>
    </VRow>
  </VContainer>
</template>
