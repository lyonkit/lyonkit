import type { AsyncComponentLoader, Component } from 'vue'
import { defineAsyncComponent } from 'vue'

export function defineBlokComponent<T extends Component = any>(loader: AsyncComponentLoader<T>) {
  // TODO: Add loader & error component
  return defineAsyncComponent({
    loader,
    timeout: 5000,
  })
}

interface PropType {
  type: string
  required?: boolean
  default?: any
  label: string
}

export interface SelectProps extends PropType {
  type: 'select'
  options: (string | number)[]
  default?: string | number
}

export type Props = Record<string, SelectProps>

export interface BlokMeta<I extends `#${string}`, P extends Props, T extends Component = any> {
  id: I
  name: string
  props: P
  loader: AsyncComponentLoader<T>
}

export interface BlokDefinition<I extends `#${string}`, P extends Props, T extends Component = any> {
  id: I
  name: string
  props: P
  component: T
}

export function defineBlok<I extends `#${string}`, P extends Props, T extends Component = any>(blok: BlokMeta<I, P, T>): BlokDefinition<I, P, T> {
  const { loader, ...meta } = blok

  return {
    ...meta,
    component: defineBlokComponent(loader),
  }
}
