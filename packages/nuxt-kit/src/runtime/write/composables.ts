import type { createLyonkitWriteApiClient } from '@leo91000/lyonkit-client'
import { useNuxtApp } from '#imports'

export function useLyonkit(): ReturnType<typeof createLyonkitWriteApiClient> {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$lyonkit
}

