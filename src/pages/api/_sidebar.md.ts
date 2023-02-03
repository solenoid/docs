import type { NextApiRequest, NextApiResponse } from 'next'
import { getSideBarLinks } from './utils'

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send(getSideBarLinks())
  } catch (e) {
    return res.status(500).send('Internal Server Error')
  }
}
