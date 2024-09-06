import { api } from '@/lib/axios'

export interface GetVisitorsCountResponse {
  amount: number
}

export async function getVisitorsCount() {
  const { data } = await api.get<GetVisitorsCountResponse>(
    '/sellers/metrics/views',
  )

  return data
}
