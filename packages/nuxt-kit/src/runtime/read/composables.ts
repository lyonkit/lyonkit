import type { LyonkitReadonlyApiClient } from '@leo91000/lyonkit-client'
// @ts-expect-error Nuxt resolved
import { useNuxtApp } from '#imports'

export function useLyonkit(): LyonkitReadonlyApiClient {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$lyonkit
}

