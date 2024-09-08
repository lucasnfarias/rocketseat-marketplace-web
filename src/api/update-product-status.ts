import { api } from '@/lib/axios'

export interface UpdateProductStatusParams {
  productId: string
  status: 'available' | 'sold' | 'cancelled'
}

export interface UpdateProductStatusResponse {
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

export async function updateProductStatus({
  productId,
  status,
}: UpdateProductStatusParams) {
  const { data } = await api.patch<UpdateProductStatusResponse>(
    `/products/${productId}/${status}`,
  )

  return data
}
