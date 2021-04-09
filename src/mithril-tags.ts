import * as mithril from "mithril";

type Tags = { [E in keyof JSX.IntrinsicElements]: BoundHyperscript & Classes };
type Classes = { [cc: string]: BoundHyperscript }

interface BoundHyperscript {
  (...children: mithril.Children[]): mithril.Vnode<any, any>;
  (attributes: mithril.Attributes, ...children: mithril.Children[]): mithril.Vnode<any, any>;
}

const tagCache = {};

export const m = new Proxy(mithril, {
  get: (obj, tag) => {
    if (blacklist.indexOf(tag as string) > -1) {
      return mithril[tag];
    }
    if (!tagCache.hasOwnProperty(tag)) {
      tagCache[tag] = new Proxy(mithril.bind(null, tag), {
        get: (obj, cc) => mithril.bind(null, `${tag.toString()}.${cc.toString()}`)
      });
    }
    return tagCache[tag];
  }
}) as mithril.Static & Tags;

export default m;

const blacklist = [
  "render", "mount", "route", "request", "jsonp", "parseQueryString",
  "buildQueryString", "buildPathName", "parsePathName", "trust", "fragment",
  "redraw",
];
