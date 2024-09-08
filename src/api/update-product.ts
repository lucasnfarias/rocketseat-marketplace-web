import { api } from '@/lib/axios'

export interface UpdateProductParams {
  productId: string
}

export interface UpdateProductBody {
  title: string
  description: string
  priceInCents: number
  categoryId: string
  attachmentsIds: string[]
}

export interface UpdateProductResponse {
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

export async function updateProduct({
  params: { productId },
  body: { title, description, priceInCents, categoryId, attachmentsIds },
}: {
  params: UpdateProductParams
  body: UpdateProductBody
}) {
  console.log({
    params: { productId },
    body: { title, description, priceInCents, categoryId, attachmentsIds },
  })

  const { data } = await api.put<UpdateProductResponse>(
    `/products/${productId}`,
    {
      title,
      description,
      priceInCents,
      categoryId,
      attachmentsIds,
    },
  )

  return data
}
