import type { NextApiRequest, NextApiResponse } from 'next'
import { getOrgRepoConfig, rewrite } from '../../utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { org = '', repo = '', pathParts } = req.query
    if (Array.isArray(org) || Array.isArray(repo)) {
      return res.status(400).send('Only one org and one repo is supported')
    }
    if (!Array.isArray(pathParts)) {
      return res.status(400).send('Expecting a list of pathParts')
    }
    const relativePath = pathParts.slice(0, -1)?.join('/')
    const resourceName = pathParts.slice(-1)[0]
    const pathWithTrailingSlash = relativePath ? `${relativePath}/` : ''
    if (Array.isArray(org) || Array.isArray(repo)) {
      return res.status(400).send('Only one org and one repo is supported')
    }
    const config = getOrgRepoConfig(org, repo)
    let fetchName = resourceName
    if (resourceName === 'README.md' && config?.home) {
      fetchName = config.home
    }
    if (resourceName === '_sidebar.md' && config?.sidebar) {
      fetchName = config.sidebar
    }
    const resource = `${config?.site}${pathWithTrailingSlash}${fetchName}`
    const fetchPromise = await fetch(resource)
    if (fetchPromise.status !== 200) {
      return res.status(404).send('Not Found')
    }
    const contentType = fetchPromise.headers.get('Content-Type') ?? 'text/plain'
    if (
      contentType.startsWith('text/') ||
      contentType.startsWith('application/javascript') ||
      contentType.startsWith('image/svg')
    ) {
      const rawText = await fetchPromise.text()
      const replacedText = contentType.startsWith('text/markdown')
        ? await rewrite(`/${org}/${repo}/${pathWithTrailingSlash}`, rawText)
        : rawText
      // const replacedText = rawText
      return res
        .status(200)
        .setHeader('Content-Type', contentType)
        .send(replacedText)
    } else {
      const buf = await fetchPromise.arrayBuffer()
      return res
        .status(200)
        .setHeader('Content-Type', contentType)
        .write(new Uint8Array(buf))
    }
  } catch (e) {
    console.log(e)
    return res.status(500).send('Internal Server Error')
  }
}
