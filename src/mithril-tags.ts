import * as mithril from "mithril";

export type Tags = { [E in keyof JSX.IntrinsicElements]: TagsElement };
export type TagsElement = { [cssClass: string]: TagsElementWithClass };
export type TagsElementWithClass = { [anotherCssClass: string]: TagsElementWithClass };
export type TagsStatic = { kebabize: boolean };

const tagCache = {};
const mithrilKeys = Object.keys(mithril);

export const m = new Proxy(mithril, { get: tagsElement }) as mithril.Static & Tags & TagsStatic;
m.kebabize = true;

function tagsElement(obj: any, tag: string): TagsElement {
  if (mithrilKeys.indexOf(tag) > -1) {
    return mithril[tag];
  }
  if (!tagCache.hasOwnProperty(tag)) {
    tagCache[tag] = new Proxy(mithril.bind(null, tag), { get: tagsElementWithClass });
  }
  return tagCache[tag];

  function tagsElementWithClass(obj: any, cssClass: string) {
    if (m.kebabize) cssClass = camelToKebab(cssClass);
    const proxy = new Proxy(mithril.bind(null, `${tag}.${cssClass}`), { get: tagsElementWithAnotherClass });
    Object.defineProperty(proxy, "tagsClasses", { value: [cssClass], enumerable: false });
    return proxy;
  }

  function tagsElementWithAnotherClass(obj: { tagsClasses: string[] }, cssClass: string) {
    if (m.kebabize) cssClass = camelToKebab(cssClass);
    const classes = [...obj.tagsClasses, cssClass];
    const proxy = new Proxy(mithril.bind(null, `${tag}.${classes.join(".")}`), { get: tagsElementWithAnotherClass });
    Object.defineProperty(proxy, "tagsClasses", { value: classes, enumerable: false });
    return proxy;
  }
}

function camelToKebab(camel: string) {
  return camel.replace(/[A-Z]/g, c => "-" + c.toLowerCase());
}

export default m;
