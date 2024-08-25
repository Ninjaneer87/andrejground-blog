export const AUTHORS = {
  andrej_forgac: {
    slug: 'andrej_forgac',
    name: 'Andrej Forgac',
    image: 'andrej.webp',
    position: 'Frontend Developer',
    description: 'UI/UX enthusiast',
    socialLinks: [
      {
        icon: 'mdi:web',
        title: 'Website',
        linkText: 'andrejground.com',
        href: 'https://andrejground.com',
        copyValue: 'https://andrejground.com',
      },
      {
        icon: 'mdi:email-box',
        title: 'Email',
        linkText: 'contact@andrejground.com',
        href: 'mailto:contact@andrejground.com',
        copyValue: 'contact@andrejground.com',
      },
      {
        icon: 'mdi:linkedin',
        title: 'LinkedIn',
        linkText: '@andrejforgac87',
        href: 'https://www.linkedin.com/in/andrejforgac87',
        copyValue: 'https://www.linkedin.com/in/andrejforgac87',
        isExternalLink: true,
      },
      {
        icon: 'mdi:github',
        title: 'Github',
        linkText: '@Ninjaneer87',
        href: 'https://github.com/Ninjaneer87',
        copyValue: 'https://github.com/Ninjaneer87',
        isExternalLink: true,
      },
      {
        icon: 'mdi:lightning-bolt',
        title: 'StackBlitz',
        linkText: '@Ninjaneer87',
        href: 'https://stackblitz.com/@Ninjaneer87',
        copyValue: 'https://stackblitz.com/@Ninjaneer87',
        isExternalLink: true,
      },
      {
        icon: 'mdi:twitter',
        title: 'Twitter',
        linkText: '@AndrejGround',
        href: 'https://x.com/AndrejGround"',
        copyValue: 'https://x.com/AndrejGround"',
        isExternalLink: true,
      },
    ],
  },
};

export type AuthorSlugs = keyof typeof AUTHORS;
export type Author = (typeof AUTHORS)[AuthorSlugs];
