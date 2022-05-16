<script setup lang="ts">
const { defineMenuLinks, defineMenuGroup, defineMenuCollection } = useMenuUtils()

const links = defineMenuLinks([
  defineMenuGroup({
    title: 'Dashboard',
    items: [
      { title: 'Accueil', to: '/dashboard' },
    ],
    icon: 'i-ic:round-space-dashboard',
  }),
  defineMenuCollection({
    title: 'Contenue',
    collection: [
      defineMenuGroup({
        title: 'Textes',
        icon: 'i-mdi:text',
        commonPath: '/content/text',
        items: [
          {
            to: '/content/text/fr',
            title: 'FR',
            icon: 'i-twemoji:flag-france',
          },
        ],
      }),
    ],
  }),
])

const menuComponents = {
  group: resolveComponent('LayoutNavbarMenuGroup'),
  collection: resolveComponent('LayoutNavbarMenuCollection'),
}
</script>

<template>
  <aside class="w-60 bg-primary text-white">
    <NuxtLink to="/" class="flex gap-1 p-2 items-center bg-primary-600 rounded-b-xl shadow">
      <div class="i-eos-icons:admin w-10 h-10 m-2" />
      <div class="text-xl">
        Administration
      </div>
    </NuxtLink>

    <Component
      :is="menuComponents[link.type]"
      v-for="(link, i) in links"
      :key="`menu_${link.type}_${i}`"
      v-bind="link"
      class="my-2"
    />
  </aside>
</template>
