import { api } from '@/lib/axios'

export interface GetProductsAvailableResponse {
  amount: number
}

export async function getProductsAvailable() {
  const { data } = await api.get<GetProductsAvailableResponse>(
    '/sellers/metrics/products/available',
  )

  return data
}
