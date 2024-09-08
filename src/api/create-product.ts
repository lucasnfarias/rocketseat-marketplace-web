import { api } from '@/lib/axios'

export interface CreateProductBody {
  title: string
  description: string
  priceInCents: number
  categoryId: string
  attachmentsIds: string[]
}

export interface CreateProductResponse {
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

export async function createProduct({
  title,
  description,
  priceInCents,
  categoryId,
  attachmentsIds,
}: CreateProductBody) {
  const { data } = await api.post<CreateProductResponse>('/products', {
    title,
    description,
    priceInCents,
    categoryId,
    attachmentsIds,
  })

  return data
}
