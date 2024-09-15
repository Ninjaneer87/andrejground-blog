import imageUrlBuilder from '@sanity/image-url';
import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
  projectId: 'q6lrrer2',
  dataset: 'production',
  useCdn: true,
};

export const productionSanityClient = createClient(config);

export const imageBuilder = imageUrlBuilder(productionSanityClient);
export function urlForImage(source: string) {
  return imageBuilder.image(source);
}

export function getHeadingsHierarchy() {
  // Query all section elements in the document
  const sections = document.querySelectorAll('.headings');

  // Initialize an array to hold the hierarchy
  type Heading = {
    level: number;
    text: string;
    children: Heading[];
  };
  const hierarchy: Heading[] = [];

  sections.forEach(section => {
    // Find the heading within the section
    const heading = section.querySelector(
      'h2, h3, h4, h5, h6',
    ) as HTMLElement | null;
    if (heading) {
      // Get the level of the heading (1-6)
      const level = parseInt(heading.tagName.replace('H', ''));

      // Create a new heading object
      const headingObj = {
        level: level,
        text: heading.innerText,
        children: [],
      };

      // Find the correct place in the hierarchy to insert this heading
      let currentLevel = hierarchy;
      let parent = null;

      for (let i = 1; i < level; i++) {
        if (currentLevel.length > 0) {
          parent = currentLevel[currentLevel.length - 1];
          currentLevel = parent.children;
        }
      }

      // Insert the heading
      currentLevel.push(headingObj);
    }
  });

  return hierarchy;
}

export function getQueryParams(url: string) {
  const params = new URLSearchParams(url);
  const result: Record<string, string[]> = {};

  params.forEach((value, key) => {
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(value);
  });

  return result;
}

export type Heading = {
  id: string;
  text: string;
};
export type H2sAndH3s = {
  h2: Heading;
  h3s: Heading[];
};

export function getH2sAndH3s() {
  const h2s = Array.from(document.querySelectorAll('h2'));
  const allH2sAndH3s = Array.from(document.querySelectorAll('h2, h3'));
  const sectionsLevelOne = Array.from(
    document.querySelectorAll('[data-heading-rank="2"]'),
  );
  const h2sWithH3s = h2s.reduce((acc, h2, i) => {
    const h3s = Array.from(sectionsLevelOne[i]?.querySelectorAll('h3') ?? []);
    acc.push({
      h2: { id: h2.id, text: h2.textContent! },
      h3s: h3s.map(h3 => ({ id: h3.id, text: h3.textContent! })),
    });

    return acc;
  }, [] as H2sAndH3s[]);

  return { h2sWithH3s, allH2sAndH3s };
}

export function getAllHeadings() {
  const allHeadingsButH1s = Array.from(
    document.querySelectorAll('h2, h3, h4, h5, h6'),
  );

  return { allHeadingsButH1s };
}
