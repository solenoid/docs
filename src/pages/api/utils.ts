import { remark } from 'remark'
import { visit } from 'unist-util-visit'

type docLinks = Array<{
  /** sidebar link name */
  name: string
  /** org/repo unique key to join on, other code may start relying on this */
  org_repo: string
  /** ultimate endpoint that will have their own docs */
  site: string
  /** docsify homepage, will default to README.md if not given */
  home?: string
  /** docsify sidebar, will default to _sidebar.md if not given */
  sidebar?: string
}>

/**
 * Hardcoded list of sites to aggregate for local testing. This could turn into
 * a simple durable storage that could be updated in isolation from the code.
 */
const items: docLinks = [
  {
    name: 'DocsifyJS Tutorial',
    org_repo: 'michaelcurrin/docsify-js-tutorial',
    site: 'https://michaelcurrin.github.io/docsify-js-tutorial/',
  },
  {
    name: 'Docsify Open Publishing Starter Kit',
    org_repo: 'hibbitts-design/demo-docsify-open-publishing-starter-kit',
    site: 'https://hibbitts-design.github.io/demo-docsify-open-publishing-starter-kit/',
    home: 'home.md',
  },
  {
    name: 'docsify-themeable',
    org_repo: 'jhildenbiddle/docsify-themeable',
    site: 'https://jhildenbiddle.github.io/docsify-themeable/',
    home: 'introduction.md',
    sidebar: 'sidebar.md',
  },
  {
    name: 'mas',
    org_repo: 'solenoid/mas',
    site: 'https://solenoid.github.io/mas/',
  },
]

export const getSideBarLinks = () => {
  return [
    '- Docisfy Sites',
    '',
    ...items
      // show deeper links that assume link rewriting will work
      .map((d) => `  - [${d.name}](/${d.org_repo}/)`),
  ].join('\n')
}

export const getOrgRepoConfig = (org: string, repo: string) =>
  items.find((d) => d.org_repo === `${org}/${repo}`)

// Useful way to go about markdown file link rewrites including schemeless
// riff from https://github.com/sindresorhus/is-absolute-url
const ABSOLUTE_URL_RE = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/
const SCHEMELESS_URL_RE = /^\/\//
const LEADING_SLASH_RE = /^\//
const LEADING_HASH_RE = /^\#/

const createLinkPrefixer = (prefix: string) => () => (tree: any) => {
  visit(tree, (node) => {
    if (node.type === 'link') {
      if (
        // Leave alone all of the urls like these
        !(
          SCHEMELESS_URL_RE.test(node.url) || // Allow external //example.com to avoid rewrites
          ABSOLUTE_URL_RE.test(node.url) || // Allow external http://example.com to avoid rewrites
          LEADING_HASH_RE.test(node.url) || // Allow assumed #same-page to avoid rewrites
          node.title?.startsWith(':include') || // Allow :include embeds to avoid rewrites
          // Avoid double rewrites if prefix is already present
          node.url?.startsWith(`${prefix}`)
        )
      ) {
        // change the rest dealing
        if (LEADING_SLASH_RE.test(node.url)) {
          // with leading slash different
          node.url = prefix + node.url.slice(1)
        } else {
          // than assumed relative
          // console.log(prefix)
          node.url = prefix + node.url
        }
        // console.log(node.url)
      }
    }
  })
}

/**
 * `prefix` is assumed to always have a trailing slash on it when present
 */
export const rewrite = async (prefix: string, mdSrc: string) => {
  const transformed = await remark()
    // could add more plugins as needed
    .use(createLinkPrefixer(prefix))
    .process(mdSrc)
  // console.log(transformed)
  return transformed.toString()
}

/** minimal default export so these utils can co-exist in the apis dir */
export default (__: any, res: any) => res.status(200).send('hi')
