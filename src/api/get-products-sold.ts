import { api } from '@/lib/axios'

export interface GetProductsSoldResponse {
  amount: number
}

export async function getProductsSold() {
  const { data } = await api.get<GetProductsSoldResponse>(
    '/sellers/metrics/products/sold',
  )

  return data
}
