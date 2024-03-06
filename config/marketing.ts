type NavItem = {
  title: string
  href: string
  disabled?: boolean
  access?: string
}

type MainNavItem = NavItem

type MarketingConfig = {
  mainNav: MainNavItem[]
}

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: 'dashboard',
      href: '/',
    },
    {
      title: 'projects',
      href: '/projects',
    },
  ],
}
