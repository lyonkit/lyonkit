import type { AsyncComponentLoader, Component } from 'vue'
import { defineAsyncComponent } from 'vue'

export function defineBlokComponent<T extends Component = any>(loader: AsyncComponentLoader<T>) {
  // TODO: Add loader & error component
  return defineAsyncComponent({
    loader,
    timeout: 5000,
  })
}
