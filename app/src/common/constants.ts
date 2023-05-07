interface ResourceLink {
  href: string
  name: string
  icon: string
}

export const RESOURCE_LINKS: ResourceLink[] = [
  {
    href: '/admin',
    name: 'Django admin',
    icon: 'mdi-view-list',
  },
  {
    href: '/api',
    name: 'Browse API',
    icon: 'mdi-api',
  },
  {
    href: '/rabbit-admin',
    name: 'RabbitMQ admin',
    icon: 'mdi-rabbit',
  }
]