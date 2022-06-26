import type { AsyncComponentLoader } from 'vue'
import { defineAsyncComponent } from 'vue'

export function defineBlokComponent<T = any>(loader: AsyncComponentLoader<T>) {
  // TODO: Add loader & error component
  return defineAsyncComponent({
    loader,
    timeout: 5000,
  })
}
