<script setup lang="ts">
import { computed, ref } from 'vue'
import { ComponentsMap } from './index'

interface BlokProps {
  componentId: string
  props: Record<string, any>
}

const props = withDefaults(defineProps<{
  bloks: BlokProps[]
  editorMode?: boolean
}>(), {
  editorMode: false,
})

defineEmits({
  up: (payload: number) => true,
  down: (payload: number) => true,
  edit: (payload: number) => true,
  delete: (payload: number) => true,
})

const selectedBlok = ref<number>()
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
        :is="ComponentsMap[blok.componentId].component"
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
  mask-image: url("./assets/img/IcRoundArrowUpward.svg");
}

.down {
  mask-image: url("./assets/img/IcRoundArrowDownward.svg");
}

.edit {
  mask-image: url("./assets/img/IcRoundEdit.svg");
}

.delete {
  mask-image: url("./assets/img/IcRoundDelete.svg");
}
</style>
