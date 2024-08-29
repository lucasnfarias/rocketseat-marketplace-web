import { api } from '@/lib/axios'

export interface GetProductsQuery {
  page: number
  status: 'available' | 'sold' | 'cancelled'
  search?: string
}

export interface GetProductsResponse {
  products: {
    id: string
    title: string
    description: string
    priceInCents: number
    owner: {
      id: string
      name: string
      phone: string
      email: string
      avatar: {
        id: string
        url: string
      }
    }
    category: {
      id: string
      title: string
      slug: string
    }
    attachments: {
      id: string
      url: string
    }[]
  }[]
}

export async function getProducts({ page, status, search }: GetProductsQuery) {
  const { data } = await api.get<GetProductsResponse>('/products', {
    params: {
      page,
      status,
      search,
    },
  })

  return data
}
