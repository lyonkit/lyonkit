// @ts-expect-error Nuxt resolved
import { useNuxtApp } from '#imports'

export function useLyonkit() {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$lyonkit
}

