// Single source of truth for all site links

export interface NavLink {
  key: string
  label: string
  href: string
  color: string           // hex for Canvas 3D
  tailwindColor: string   // tailwind class for Terminal
  ready: boolean          // false = hide until page is done
}

export interface SocialLink {
  key: string
  label: string
  href: string
  icon: 'star' | 'github' | 'linkedin' | 'file'
  external: boolean
}

export const navLinks: NavLink[] = [
  { key: 'music', label: 'music', href: '/music', color: '#ef4136', tailwindColor: 'text-ember', ready: false },
  { key: 'work', label: 'work', href: '/work', color: '#50d2cb', tailwindColor: 'text-signal', ready: false },
  { key: 'code', label: 'code', href: '/concepts', color: '#7ec245', tailwindColor: 'text-pulse', ready: true },
]

export const socialLinks: SocialLink[] = [
  { key: 'github', label: 'GitHub', href: 'https://github.com/joeczar', icon: 'github', external: true },
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/joe-czar/', icon: 'linkedin', external: true },
  { key: 'rolllercoaster', label: 'rollercoaster.dev', href: 'https://rollercoaster.dev', icon: 'star', external: true },
]

export function useSiteLinks() {
  const activeNavLinks = computed(() => navLinks.filter(link => link.ready))

  return {
    navLinks,
    activeNavLinks,
    socialLinks,
  }
}
