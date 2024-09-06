import { api } from '@/lib/axios'

export interface GetProductParams {
  productId: string
}

export interface GetProductResponse {
  product: {
    id: string
    title: string
    description: string
    priceInCents: number
    status: 'available' | 'sold' | 'cancelled'
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
  }
}

export async function getProduct({ productId }: GetProductParams) {
  const { data } = await api.get<GetProductResponse>(`/products/${productId}`)

  return data
}
