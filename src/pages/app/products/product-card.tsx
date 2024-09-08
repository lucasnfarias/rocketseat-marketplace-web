import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CategoryChip } from '@/pages/app/products/category-chip'
import { StatusChip } from '@/pages/app/products/status-chip'
import { Link } from 'react-router-dom'

export interface ProductCardProps {
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

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="rounded-[20px] flex flex-col p-1 w-[calc(50%-16px)] relative border-solid border-2 border-transparent hover:border-blue-base transition-all">
      <Link to={`/products/edit/${product.id}`}>
        <div className="absolute top-3 right-3 flex gap-1 text-red-500">
          <StatusChip status={product.status} />
          <CategoryChip category={product.category} />
        </div>

        <div
          className="h-[144px] rounded-[16px] bg-center bg-cover"
          style={{
            backgroundImage: `url(${product.attachments[0].url})`,
          }}
        />
        <CardHeader className="p-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-subtitle text-gray-400 text-[1rem]">
              {product.title}
            </CardTitle>
            <p className="text-gray-500 font-bold">
              <span className="text-label-sm font-normal">R$</span>{' '}
              {(product.priceInCents / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <CardDescription className="text-gray-300 text-body-sm line-clamp-2">
            {product.description}
          </CardDescription>
        </CardHeader>
      </Link>
    </Card>
  )
}
