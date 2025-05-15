export interface SidebarItem {
  name: string
  icon: string
  path: string
}

export const sidebarItems: SidebarItem[] = [
  { name: 'Links', icon: 'link', path: '/links' },
  { name: 'Analytics', icon: 'chart', path: '/analytics' },
]
