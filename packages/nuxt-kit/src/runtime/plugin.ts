import { LyonkitWriteApiClient } from '@leo91000/lyonkit-client'
// @ts-expect-error Nuxt resolved
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
// @ts-expect-error Nuxt resolved
import { apiKey } from '#lyonkit-options'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const lyonkit = new LyonkitWriteApiClient({ apiKey: apiKey ?? config.public.lyonkitApiKey ?? config.lyonkitApiKey ?? '' })

  return {
    provide: {
      lyonkit,
    },
  }
})
