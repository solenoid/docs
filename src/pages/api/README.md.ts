import type { NextApiResponse } from 'next'

export default (__: any, res: NextApiResponse) =>
  res.status(200).send(`
# Docs Aggregator README.md

More information coming soon.
`)
