import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HelloWorld from '../../src/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('should render', () => {
    const wrapperH1 = mount(HelloWorld)
    expect(wrapperH1.text()).toContain('Hello World !')
    expect(wrapperH1.html()).toMatchInlineSnapshot('"<h1> Hello World ! </h1>"')

    const wrapperH2 = mount(HelloWorld, { props: { size: 4 } })
    expect(wrapperH2.text()).toContain('Hello World !')
    expect(wrapperH2.html()).toMatchInlineSnapshot('"<h4> Hello World ! </h4>"')
  })
})
