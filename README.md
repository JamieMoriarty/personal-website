# My personal website

Welcome to the repo containing code and config for my personal website.
At time of writing, this has yet to be deployed (or developed to completion), so if you're here
all you'll get is code :)

## Tech stack

### Build tool

I'm using [Vite](https://vitejs.dev/) as build tool (and for the basic scaffold template), instead of
scaffolding with [create-react-app](https://github.com/facebook/create-react-app), which is the default as far as I'm aware.

So far the experience is good. The dev server boots up **a lot** faster! I've yet to actually
build and push to a produciton environment, so we'll see how it goes when we get there.

### Frameworks, language, etc.

I'm using React with typescript and CSS modules for styling. No CSS preprocessor, but I _am_
using postcss to extend CSS with some really handy features. More on the below.

### Noteable libraries

-   **vitest:** Since jest (apparently) doesn't mesh well with Vite, I'm using the [vitest](https://vitest.dev/) library as a drop-in replacement. No complaints so far, seems to work
    beautifully!
-   **postcss-preset-env** I'm using [postcss-preset-env](https://preset-env.cssdb.org/) to
    easily extend CSS with the features I need. So far this is [Custom Media Queries](https://preset-env.cssdb.org/features/#custom-media-queries) and [CSS Nesting Rules](https://preset-env.cssdb.org/features/#nesting-rules). So far, I'm really happy!
-   **Apollo GraphQL client:** I'm using the [Apollo client](https://www.apollographql.com/docs/react/) to connect to Contenful which I'm using as CMS. I'm also using [GraphQL codegen](https://the-guild.dev/graphql/codegen) for autogenerating typescript annotations for the integration. I'm not happy about it though. The Typescript annotations are much more generic than they need to be and the Apollo client only exposes a hook and I'm really not confident it's going to work well if (when) I switch to SSR/SSG. So I'd like to change this part when I have time for it.

### External integrations

I'm using [Contentful](https://www.contentful.com/) for CMS, which is the only external integration for the time being.
