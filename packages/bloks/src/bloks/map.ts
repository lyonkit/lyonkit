import BHelloWorld from './BHelloWorld'

export const BlokMap = {
  [BHelloWorld.id]: BHelloWorld,
}
export type BlokIds = keyof typeof BlokMap
