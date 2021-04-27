{ JSDOM } = require "jsdom"
dom = new JSDOM!
global.window = dom.window
global.request-animation-frame = dom.request-animation-frame
{ m } = require "../src/mithril-tags.ts"

console.log m.div.test.it "hello"
