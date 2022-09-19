import type { createLyonkitReadonlyApiClient } from '@leo91000/lyonkit-client'
import { useNuxtApp } from '#imports'

export function useLyonkit(): ReturnType<typeof createLyonkitReadonlyApiClient> {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$lyonkit
}

