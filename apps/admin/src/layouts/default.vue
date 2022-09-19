<script setup lang="ts">
import { mdiChevronDown, mdiChevronRight, mdiChevronUp, mdiCreation, mdiPageLayoutBody, mdiSortVariant, mdiViewDashboard } from '@mdi/js'

const drawer = useLocalStorage('drawer', true)
const toggleDrawer = useToggle(drawer)

const { openToast } = useToast()
const lyonkit = useLyonkit()

const { pages, loading } = usePageList()

const menu = computed(() => [
  {
    text: 'Dashboard',
    icon: mdiViewDashboard,
    to: '/dashboard',
  },
  {
    text: 'Pages',
    icon: mdiPageLayoutBody,
    submenu: [
      {
        text: 'Créer un page',
        icon: mdiCreation,
        to: '/pages/create',
      },
      {
        text: 'Organiser les pages',
        icon: mdiSortVariant,
        to: '/pages/organize',
      },
      ...pages.value.map(page => ({
        text: page.title,
        icon: mdiChevronRight,
        to: `/pages/i${page.path}`,
      })),
    ],
  },
])
</script>

<template>
  <VLayout>
    <VAppBar color="primary" density="comfortable">
      <template #prepend>
        <VAppBarNavIcon @click="toggleDrawer()" />
      </template>

      <VAppBarTitle>Administration</VAppBarTitle>
    </VAppBar>
    <VNavigationDrawer v-model="drawer">
      <p v-if="loading">
        Loading...
      </p>
      <VList v-else>
        <template
          v-for="item in menu"
          :key="item.text"
        >
          <VListItem
            v-if="!item.submenu || !item.submenu.length"
            :to="item.to"
            :prepend-icon="item.icon"
            :title="item.text"
            :value="item.text"
          />
          <VListGroup
            v-else
            :expand-icon="mdiChevronDown"
            :collapse-icon="mdiChevronUp"
          >
            <template #activator="{ props }">
              <VListItem
                v-bind="props"
                :prepend-icon="item.icon"
                :title="item.text"
                :value="item.text"
              />
            </template>

            <VListItem
              v-for="subItem in item.submenu"
              :key="subItem.text"
              :to="subItem.to"
              :prepend-icon="subItem.icon"
              :title="subItem.text"
              :value="subItem.text"
            />
          </VListGroup>
        </template>
      </VList>
    </VNavigationDrawer>
    <VMain>
      <slot />
    </VMain>
  </VLayout>
</template>
