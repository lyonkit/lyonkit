import { defineBlok } from '../utils'

const BHelloWorld = defineBlok({
  id: '#hello-world',
  name: 'HelloWorld',
  props: {
    size: {
      type: 'select',
      options: [1, 2, 3, 4, 5, 6],
      default: 1,
      label: 'Taille du header',
    },
  },
  loader: () => import('./HelloWorld.vue'),
})

export default BHelloWorld
