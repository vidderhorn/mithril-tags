# mithril-tags

> Enhanced hyperscript for Mithril

This library provides a wrapped Mithril which allows you to supply hyperscript element and class names in a clean, readable fashion.

```ts
// vanilla mithril
m("div.container", "hello");

// mithril-tags
m.div.container("hello");
```

Multiple classes are supported and class names are converted from camelCase to kebab-case. This can be disabled with `m.kebabize = false`.

```ts
m.div.container.anotherClass("hello!");
```
```html
<div class="container another-class">hello!</div>
```

In TypeScript element names will be type-checked and will appear in IDE code completion. However, LiveScript will look more beautiful.

```ls
m.form."w-400" do
  m.div.form-group do
    m.label {for:\id} \ID
    m.input.form-control."w-50" {type:\text, id:\id}
```
