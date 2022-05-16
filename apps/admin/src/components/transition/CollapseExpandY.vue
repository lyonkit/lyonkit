<script setup lang="ts">
function beforeEnter(element: HTMLElement) {
  requestAnimationFrame(() => {
    if (!element.style.height)
      element.style.height = '0px'

    element.style.display = ''
  })
}

function enter(element: HTMLElement) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.height = `${element.scrollHeight}px`
    })
  })
}

function afterEnter(element: HTMLElement) {
  element.style.height = ''
}

function beforeLeave(element: HTMLElement) {
  requestAnimationFrame(() => {
    if (!element.style.height)
      element.style.height = `${element.offsetHeight}px`
  })
}

function leave(element: HTMLElement) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.height = '0px'
    })
  })
}

function afterLeave(element: HTMLElement) {
  element.style.height = ''
}
</script>

<template>
  <Transition
    enter-active-class="overflow-hidden transition-all duration-500"
    leave-active-class="overflow-hidden transition-all duration-500"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </Transition>
</template>
