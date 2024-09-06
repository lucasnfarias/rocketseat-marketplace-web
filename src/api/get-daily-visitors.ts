import { api } from '@/lib/axios'

export interface GetDailyVisitorsResponse {
  viewsPerDay: {
    date: string
    amount: number
  }[]
}

export async function getDailyVisitors() {
  const { data } = await api.get<GetDailyVisitorsResponse>(
    '/sellers/metrics/views/days',
  )

  return data
}
