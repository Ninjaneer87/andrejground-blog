import { FILTER_KEYS, type FilterKey } from 'src/constants';

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

export function pushFiltersToUrl(
  newFilters: { [key in FilterKey]?: string },
  reset = false,
) {
  if (reset) {
    window.history.pushState({}, '', window.location.pathname);
    return;
  }

  const currentSearchQuery = window.location.search;
  const currentQueryParams = getQueryParams(currentSearchQuery);

  const newSearchParams = new URLSearchParams();

  for (const filterKey of FILTER_KEYS) {
    if (filterKey === 'q') {
      if (newFilters[filterKey] === undefined) {
        currentQueryParams[filterKey]?.forEach(value => {
          newSearchParams.append(filterKey, value);
        });
        continue;
      }

      if (newFilters[filterKey]!.length)
        newSearchParams.append(filterKey, newFilters[filterKey]!);
      continue;
    }

    if (!newFilters[filterKey]) {
      currentQueryParams[filterKey]?.forEach(value => {
        newSearchParams.append(filterKey, value);
      });
      continue;
    }

    if (!currentQueryParams[filterKey]) {
      newSearchParams.append(filterKey, newFilters[filterKey]!);
      continue;
    }

    if (currentQueryParams[filterKey].includes(newFilters[filterKey]!)) {
      currentQueryParams[filterKey].forEach(value => {
        if (value === newFilters[filterKey]) return;
        newSearchParams.append(filterKey, value);
      });
      continue;
    }

    currentQueryParams[filterKey].forEach(value => {
      newSearchParams.append(filterKey, value);
    });
    newSearchParams.append(filterKey, newFilters[filterKey]!);
  }

  const newSearchString = newSearchParams.toString();
  const newSearchQuery = newSearchString ? `?${newSearchString}` : '';

  const currentUrl = `${window.location.pathname}${currentSearchQuery}`;
  const newUrl = `${window.location.pathname}${newSearchQuery}`;

  if (currentUrl !== newUrl) {
    window.history.pushState({}, '', newUrl);
  }
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
