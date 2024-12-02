export const JOBS_LIST = [
  {
    position: 'Frontend developer - contract',
    company: 'Snyk',
    href: 'https://snyk.io',
    duration: 'Nov 2024 - Present',
    description: 'Developer-first security in action',
    isOngoing: true,
    companyLocation: 'United States',
    technologies: [
      'React',
      'TypeScript',
      'JavaScript',
      'Redux',
      'Redux Saga',
      'Styled Components',
      'Cypress',
      'Next JS',
    ],
  },
  {
    position: 'Frontend developer - contract',
    company: 'Probely',
    href: 'https://probely.com',
    duration: 'Mar 2023 - Nov 2024',
    description: 'Cybersecurity DAST tool',
    isOngoing: false,
    companyLocation: 'Portugal',
    technologies: [
      'React',
      'TypeScript',
      'JavaScript',
      'Redux',
      'Redux Saga',
      'Styled Components',
      'Cypress',
      'Next JS',
    ],
  },
  {
    position: 'Frontend developer - contract',
    company: 'Single Earth',
    href: 'https://single.earth',
    duration: 'Oct 2021 - Oct 2022',
    description: 'Bridging nature and finance, climate and biodiversity',
    isOngoing: false,
    companyLocation: 'Estonia',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'Jest', 'Sass'],
  },
  {
    position: 'Frontend developer - contract',
    company: 'ApaOne',
    href: 'https://apaone.com',
    duration: 'Aug 2019 - Jul 2021',
    description: 'Digital marketing agency and web solutions',
    isOngoing: false,
    companyLocation: 'Serbia',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Material UI',
      'Redux',
      'Redux Saga',
      'PHP',
      'MySQL',
    ],
  },
];

export type SocialPlatform =
  | 'twitter'
  | 'github'
  | 'linkedin'
  | 'email'
  | 'website'
  | 'stackblitz';

export type Author = {
  slug: string;
  name: string;
  image: string;
  position: string;
  description: string;
  socialLinks: {
    platform: SocialPlatform;
    title: string;
    linkText: string;
    href: string;
    copyValue: string;
    isExternalLink?: boolean;
  }[];
};

export type Authors = Record<string, Author>;

export const AUTHORS: Authors = {
  andrej_forgac: {
    slug: 'andrej_forgac',
    name: 'Andrej Forgac',
    image: 'andrej.webp',
    position: 'Frontend Developer',
    description: 'UX/UI enthusiast',
    socialLinks: [
      {
        platform: 'website',
        title: 'Website',
        linkText: 'andrejground.com',
        href: 'https://andrejground.com',
        copyValue: 'https://andrejground.com',
      },
      {
        platform: 'email',
        title: 'Email',
        linkText: 'contact@andrejground.com',
        href: 'mailto:contact@andrejground.com',
        copyValue: 'contact@andrejground.com',
      },
      {
        platform: 'linkedin',
        title: 'LinkedIn',
        linkText: '@andrejforgac87',
        href: 'https://www.linkedin.com/in/andrejforgac87',
        copyValue: 'https://www.linkedin.com/in/andrejforgac87',
        isExternalLink: true,
      },
      {
        platform: 'github',
        title: 'Github',
        linkText: '@Ninjaneer87',
        href: 'https://github.com/Ninjaneer87',
        copyValue: 'https://github.com/Ninjaneer87',
        isExternalLink: true,
      },
      {
        platform: 'stackblitz',
        title: 'StackBlitz',
        linkText: '@Ninjaneer87',
        href: 'https://stackblitz.com/@Ninjaneer87',
        copyValue: 'https://stackblitz.com/@Ninjaneer87',
        isExternalLink: true,
      },
      {
        platform: 'twitter',
        title: 'X (Twitter)',
        linkText: '@AndrejGround',
        href: 'https://x.com/AndrejGround',
        copyValue: 'https://x.com/AndrejGround',
        isExternalLink: true,
      },
    ],
  },
} as const;

export const POPULAR_TAGS = [
  {
    icon: 'mdi:react',
    title: 'React',
    tiltDirection: 'left',
    href: '/articles?tag=react',
  },
  {
    icon: 'mdi:language-typescript',
    title: 'TypeScript',
    tiltDirection: 'right',
    href: '/articles?tag=typescript',
  },
  {
    icon: 'mdi:react',
    title: 'React',
    tiltDirection: 'left',
    href: '/articles?tag=react',
  },
  {
    icon: 'mdi:react',
    title: 'React',
    tiltDirection: 'left',
    href: '/articles?tag=react',
  },
];

export const FILTER_KEYS = ['tag', 'author', 'q'] as const;

export type FilterKey = typeof FILTER_KEYS[number];