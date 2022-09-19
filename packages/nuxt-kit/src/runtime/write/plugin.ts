import { createLyonkitWriteApiClient } from '@leo91000/lyonkit-client'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
// @ts-expect-error Nuxt resolved
import { apiKey as cfgApiKey } from '#lyonkit-options'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const apiKey = cfgApiKey ?? config.public?.lyonkitApiKey ?? config.lyonkitApiKey ?? ''
  const lyonkit = createLyonkitWriteApiClient({ apiKey })

  return {
    provide: {
      lyonkit,
    },
  }
})
