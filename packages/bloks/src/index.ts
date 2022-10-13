import type { DefineComponent } from 'vue'
export type { BlokIds } from './bloks'
export { BlokMap, BlokRenderer } from './bloks'

// @ts-expect-error Vite does not define meta.glob
export const Components: Record<string, () => Promise<DefineComponent<{}, {}, any>>> = import.meta.glob('./bloks/**/*.vue')
