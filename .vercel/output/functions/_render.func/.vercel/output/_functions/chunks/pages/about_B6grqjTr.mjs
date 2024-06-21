/* empty css                          */
import { c as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from '../astro_BGjSSdkR.mjs';
import 'kleur/colors';
import { $ as $$RootLayout } from './404_Qh3zlhQF.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "pageTitle": "About" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>About</h1> ` })}`;
}, "/Users/andrejground/andrejground-blog/src/pages/about.astro", void 0);

const $$file = "/Users/andrejground/andrejground-blog/src/pages/about.astro";
const $$url = "/about";

export { $$About as default, $$file as file, $$url as url };
