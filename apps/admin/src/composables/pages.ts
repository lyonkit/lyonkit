import type { PageOutput } from '@leo91000/lyonkit-client'

const pages = ref<PageOutput[]>([])
const loading = ref(false)
let firstFetch = false

export function usePageList() {
  const lyonkit = useLyonkit()
  const { openToast } = useToast()

  async function fetchPages() {
    loading.value = !firstFetch
    if (!firstFetch)
      firstFetch = true
    try {
      pages.value = await lyonkit.listPages()
    }
    catch (e) {
      console.error('An error occured while fetching page list', e)
      openToast({
        type: 'error',
        message: 'Une erreur est survenue lors de la récupération de la liste des pages',
      })
    }
    finally {
      loading.value = false
    }
  }

  if (!firstFetch)
    fetchPages()

  return {
    fetchPages,
    pages,
    loading,
  }
}
