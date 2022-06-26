import type { Props } from '../types'
import { defineBlokComponent } from '../utils'

export const HelloWorldId = '#hello-world'

export const HelloWorldMeta = {
  id: HelloWorldId,
  name: 'HelloWorld',
  props: <Props> {
    size: {
      type: 'select',
      options: [1, 2, 3, 4, 5, 6],
      default: 1,
    },
  },
  component: defineBlokComponent(() => import('./HelloWorld.vue')),
}
