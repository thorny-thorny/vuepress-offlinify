# VuePress offlinify

[VuePress](https://vuepress.vuejs.org/) is a great tool for SPA containing set of articles like blog or documentation. It is a static site generator so a simple static content webserver is enough to serve it. But could it work locally via `file://` links without a server at all? Apparently it doesn't, and I didn't find a way to make underlying webpack to make it. However it sounds possible if just use relative links and routing. Since it's not supported out of the box, here goes the dirty hacky way with rewriting output files :D

## Disclaimer

Keep in mind the MIT license. This script is way too hacky to be called stable, you should consider all risks before using it for production.

## Supported features

`example-docs` contains simple VuePress site I've checked the script on. You can check the result in the releases.

| Feature \ VuePress version | 1.5.1 |
| -------------------------- | ----- |
| Basic MD features | ✔️ |
| Basic theme | ✔️ |
| Sidebar and searchbar | ✔️ |
| External and internal links | ✔️ |
| Internal images | ✔️ |
| Scrolling to anchor when navigating from another page | ❌ |
| Everything else | ❓ |

## Usage

Just copy-paste `offlinify.js` into root of your project and run it passing path to the site content like this:
``` js
node offlinify.js example-docs
```

## Limitations

Routing is supposed to work for pages placed in the root of site only like `docs/example.html`. I doubt it would work with nested pages like `docs/reference/example.html`.

## Roadmap

I might check issues and PRs from time to time or fix scrolling and check favicon or publish it as NPM package, I dunno. It depends on repo stars and demand.
