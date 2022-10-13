import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HelloWorld from '../../src/bloks/BHelloWorld/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('should render', () => {
    const wrapperH1 = mount(HelloWorld)
    expect(wrapperH1.text()).toContain('Hello World !')
  })
})
