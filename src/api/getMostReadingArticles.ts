import makeRequest from './makeRequest'
import { Posts } from '../interfaces'

export default async () =>
  await makeRequest<{ articles: Posts }>({
    path: 'articles/most-reading',
    version: 2,
  })
