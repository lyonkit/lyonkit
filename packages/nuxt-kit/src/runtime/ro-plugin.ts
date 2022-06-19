import { LyonkitReadonlyApiClient } from '@leo91000/lyonkit-client'
// @ts-expect-error Nuxt resolved
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const lyonkit = new LyonkitReadonlyApiClient({ apiKey: config.public.lyonkitApiKey ?? config.lyonkitApiKey ?? '' })

  return {
    provide: {
      lyonkit,
    },
  }
})
