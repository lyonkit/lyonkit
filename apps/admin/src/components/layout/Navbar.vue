<script setup lang="ts">
const { defineMenuLinks, defineMenuGroup, defineMenuCollection } = useMenuUtils()

const lyonkit = useLyonkit()

const links = defineMenuLinks([
  defineMenuGroup({
    title: 'Dashboard',
    items: [
      { title: 'Accueil', to: '/dashboard', icon: 'i-mdi:home' },
    ],
    icon: 'i-ic:round-space-dashboard',
  }),
  defineMenuCollection({
    title: 'Contenue',
    collection: [
      defineMenuGroup({
        title: 'Pages',
        icon: 'i-mdi:text',
        commonPath: '/content/pages',
        items: [
          {
            to: '/content/pages/list',
            title: 'Toutes les pages',
            icon: 'i-mdi:page-layout-header-footer',
          },
          {
            to: '/content/pages/create',
            title: 'Créer une page',
            icon: 'i-mdi:add',
          },
        ],
      }),
      defineMenuGroup({
        title: 'Interface',
        icon: 'i-fluent:draw-image-20-filled',
        commonPath: '/content/bloks',
        items: [
          {
            to: '/content/bloks/explorer',
            title: 'Explorer',
            icon: 'i-material-symbols:explore',
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
  <aside class="bg-primary text-white">
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
