/* empty css                          */
import { c as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead, A as AstroError, k as UnknownContentCollectionError, l as renderUniqueStylesheet, n as renderScriptElement, o as createHeadAndContent, u as unescapeHTML, b as addAttribute, d as createAstro } from '../astro_BGjSSdkR.mjs';
import 'kleur/colors';
import { $ as $$RootLayout } from './404_Qh3zlhQF.mjs';
import pLimit from 'p-limit';
import { p as prependForwardSlash } from '../astro/assets-service_XQaHx0JJ.mjs';
import 'clsx';

const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "pageTitle": "Articles, stories & tutorials for tech people" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Articles</h1> ` })}`;
}, "/Users/andrejground/andrejground-blog/src/pages/articles/index.astro", void 0);

const $$file$1 = "/Users/andrejground/andrejground-blog/src/pages/articles/index.astro";
const $$url$1 = "/articles";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/best-laptops-for-developers.md": () => import('../best-laptops-for-developers_DbV25cVj.mjs'),"/src/content/blog/cutting-edge-tablets.md": () => import('../cutting-edge-tablets_Bl1Zvni_.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"the-best-laptops-for-developers-in-2024":"/src/content/blog/best-laptops-for-developers.md","unleash-creativity-with-these-cutting-edge-tablets":"/src/content/blog/cutting-edge-tablets.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/best-laptops-for-developers.md": () => import('../best-laptops-for-developers_CE9JMKLu.mjs'),"/src/content/blog/cutting-edge-tablets.md": () => import('../cutting-edge-tablets_Dpl1wdvP.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const $$Astro = createAstro();
const $$ArticleCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArticleCard;
  const { article } = Astro2.props;
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const formattedPublishDate = new Date(article.data.pubDate).toLocaleDateString(
    "en-US",
    dateOptions
  );
  return renderTemplate`${maybeRenderHead()}<div class="max-w-[300px] flex grow flex-col justify-center gradient-wrapper shadow-[35px_35px_100px_-15px_rgba(0,0,0,0.1)] shadow-text/10"> <div class="flex flex-col h-[500px] max-h-[60vh] w-full bg-cover bg-center p-8 rounded-2xl justify-between"> <div class="flex flex-col gap-4"> <a${addAttribute(`/blog/${article.slug}`, "href")} class="block text-xl text-text dark:text-text hover:text-primary transition-colors"> ${article.data.title} </a> <ul class="flex gap-2"> ${article.data.tags.map((tag) => renderTemplate`<li class="text-xs border-primary border-solid border-[1px] text-primary px-2 py-1 rounded-lg uppercase"> ${tag} </li>`)} </ul> </div> <div class="mt-auto flex flex-col gap-2"> <div class="flex gap-2 items-center"> <img class="rounded-full w-8 h-8"${addAttribute(`images/${article.data.authorImage}`, "src")}${addAttribute(article.data.author, "alt")}> <div>${article.data.author}</div> </div> <small class="text-gray-400 font-semibold">on ${formattedPublishDate}</small> </div> </div> </div>`;
}, "/Users/andrejground/andrejground-blog/src/components/ArticleCard.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allBlogArticles = await getCollection("blog");
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "pageTitle": "Blog" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex gap-8 items-center justify-center pt-20"> <ul class="flex gap-8 items-center justify-center flex-wrap"> ${allBlogArticles.map((article) => renderTemplate`${renderComponent($$result2, "ArticleCard", $$ArticleCard, { "article": article })}`)} </ul> </div> ` })}`;
}, "/Users/andrejground/andrejground-blog/src/pages/index.astro", void 0);

const $$file = "/Users/andrejground/andrejground-blog/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
