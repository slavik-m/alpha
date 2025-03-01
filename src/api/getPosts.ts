import makeRequest from './makeRequest'
import { AuthorizedRequestParams, FlowAlias, Posts } from '../interfaces'
import { Mode } from 'src/config/constants'

export const modeParams = {
  all: { sort: 'rating' },
  top0: { sort: 'rating', score: '0' },
  top10: { sort: 'rating', score: '10' },
  top25: { sort: 'rating', score: '25' },
  top50: { sort: 'rating', score: '50' },
  top100: { sort: 'rating', score: '100' },
  daily: { period: 'daily', sort: 'date' },
  weekly: { period: 'weekly', sort: 'date' },
  monthly: { period: 'monthly', sort: 'date' },
  yearly: { period: 'yearly', sort: 'date' },
  alltime: { period: 'alltime', sort: 'date' },
}

export const modeTokenPaths = {
  all: 'posts/all',
  top0: 'posts/all/top0',
  top10: 'posts/all/top10',
  top25: 'posts/all/top25',
  top50: 'posts/all/top50',
  top100: 'posts/all/top100',
  daily: 'top/daily',
  weekly: 'top/weekly',
  monthly: 'top/monthly',
  yearly: 'top/yearly',
  alltime: 'top/alltime',
}

interface Params {
  mode: Mode
  page: number
  hubAlias?: string
  token?: string
  flow?: FlowAlias
  authData?: AuthorizedRequestParams
}

export default async ({
  mode,
  page,
  hubAlias,
  flow = 'all',
  authData,
}: Params) =>
  await makeRequest<Posts>({
    path: 'articles',
    version: 2,
    params: {
      ...modeParams[mode],
      sort: flow === 'all' ? modeParams[mode].sort : 'all',
      page: page.toString(),
      hub: hubAlias || '',
      flow: (flow === 'all' || flow === 'feed') ? '' : flow,
      custom: flow === 'feed' ? 'true' : ''
    },
    authData,
  })
