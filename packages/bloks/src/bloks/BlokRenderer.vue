<script setup lang="ts">
import { ref } from 'vue'
import type { BlokIds } from './map'
import { BlokMap } from './map'

const props = withDefaults(defineProps<{
  bloks: ({ componentId: BlokIds; props: Record<string, any> })[]
  editorMode?: boolean
}>(), {
  editorMode: false,
})

defineEmits({
  up: (_payload: number) => true,
  down: (_payload: number) => true,
  edit: (_payload: number) => true,
  delete: (_payload: number) => true,
})

const selectedBlok = ref<number>()

function getComponent(componentId: BlokIds) {
  const spec = BlokMap[componentId]
  if (!spec)
    throw new Error(`Unknown blok component ${componentId}`)

  return spec.component
}
</script>

<template>
  <div :class="{ [$style.parent]: true, [$style.editor]: editorMode }">
    <div
      v-for="(blok, i) in bloks"
      :key="`Blok${i}`"
      :class="{ [$style.blok]: true, [$style.selected]: i === selectedBlok }"
      @click="selectedBlok = i"
    >
      <component
        :is="getComponent(blok.componentId)"
        v-bind="blok.props"
        :class="$style.component"
      />
      <div v-if="editorMode" :class="$style.actions">
        <button :class="$style.up" @click="$emit('up', i)" />
        <button :class="$style.down" @click="$emit('down', i)" />
        <button :class="$style.edit" @click="$emit('edit', i)" />
        <button :class="$style.delete" @click="$emit('delete', i)" />
      </div>
    </div>
  </div>
</template>

<style module>
.parent, .blok, .component {
  all: initial;
}

.editor {
  --horizontal-blok-padding: 0.5rem;
  --hover-color: lightblue;
  --selected-color: blue;
  --hover-cursor: pointer;
}

.parent {
  --blok-border-size: 1px;

  width: 100%;
  display: flex;
  flex-direction: column;
}

.parent > * {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.blok {
  border: var(--blok-border-size) solid transparent;
  padding: 0 var(--horizontal-blok-padding, 0);
  width: 100%;
  flex-grow: 1;
  display: flex;
  position: relative;
}

.blok:hover, .selected {
  transition: border 0.2s ease-in-out;
  border-width: var(--blok-border-size);
  border-style: solid;
}

.blok:hover:not(.selected) {
  border-color: var(--hover-color, transparent);
}

.selected {
  border-color: var(--selected-color, transparent);
  --actions-visibility: visible;
}

.component {
  width: 100%;
}

.component:hover {
  cursor: var(--hover-cursor, inherit);
}

.actions {
  --icon-size: 1.5rem;
  --icon-color: #888888;
  visibility: var(--actions-visibility, hidden);
  position: absolute;
  top: calc(-1 * var(--icon-size) - 0.3rem);
  right: -0.1rem;
  width: calc(4 * var(--icon-size));
}

.actions > button {
  background-color: var(--icon-color);
  width: var(--icon-size);
  height: var(--icon-size);
  transition: background-color 0.2s ease-in-out;
  mask-size: contain;
}

.actions > button:hover {
  --icon-color: #aaaaaa;
}

.up {
  mask-image: url("../assets/img/IcRoundArrowUpward.svg");
}

.down {
  mask-image: url("../assets/img/IcRoundArrowDownward.svg");
}

.edit {
  mask-image: url("../assets/img/IcRoundEdit.svg");
}

.delete {
  mask-image: url("../assets/img/IcRoundDelete.svg");
}
</style>
