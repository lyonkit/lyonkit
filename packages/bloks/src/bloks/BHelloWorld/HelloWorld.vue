<script setup lang="ts">
withDefaults(defineProps<{
  size?: 1 | 2 | 3 | 4 | 5 | 6
}>(), {
  size: 1,
})
</script>

<template>
  <component
    :is="`h${size}`"
    :class="$style.hello"
  >
    Hello World !
  </component>
</template>

<style module>
.hello {
  text-align: center;
  color: #9c27b0;
}

h1.hello {
  font-size: 3em;
}

h2.hello {
  font-size: 2em;
}

h3.hello {
  font-size: 1.5em;
}

h4.hello {
  font-size: 1.25em;
}

h5.hello {
  font-size: 1em;
}

h6.hello {
  font-size: 0.875em;
}
</style>
