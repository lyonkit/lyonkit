import type { DefineComponent } from 'vue'
import { HelloWorldId, HelloWorldMeta } from './components/HelloWorld.meta'
import BloksRenderer from './BloksRenderer.vue'

export const ComponentsMap = {
  [HelloWorldId]: HelloWorldMeta,
}

// @ts-expect-error Vite does not define meta.glob
export const Components: Record<string, () => Promise<DefineComponent<{}, {}, any>>> = import.meta.glob('./components/**/*.vue')

export { BloksRenderer }
