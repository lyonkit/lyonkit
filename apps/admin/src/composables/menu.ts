import type { Icon } from '~/types/utils'

export interface MenuItem {
  icon?: Icon
  title: string
  to: string
}

export interface MenuGroup {
  type: 'group'
  title: string
  items: MenuItem[]
  icon: Icon
  commonPath?: string
}

export interface MenuCollection {
  type: 'collection'
  title: string
  collection: MenuGroup[]
}

export function useMenuUtils() {
  function defineMenuGroup(group: Omit<MenuGroup, 'type'>): MenuGroup {
    return {
      type: 'group',
      ...group,
    }
  }

  function defineMenuCollection(group: Omit<MenuCollection, 'type'>): MenuCollection {
    return {
      type: 'collection',
      ...group,
    }
  }

  function defineMenuLinks(links: Array<MenuCollection | MenuGroup>): Array<MenuCollection | MenuGroup> {
    return links
  }

  return { defineMenuGroup, defineMenuCollection, defineMenuLinks }
}

