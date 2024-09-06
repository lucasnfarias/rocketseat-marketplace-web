import { getCategories } from '@/api/get-categories'
import { getProduct } from '@/api/get-product'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductEditForm } from '@/pages/app/products/edit/product-edit-form'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'

export function ProductsEdit() {
  const { productId } = useParams()

  const { data: productData } = useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProduct({ productId: productId as string }),
  })

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return (
    <div className="w-full max-w-[1030px] mx-auto">
      <Helmet title="Editar produto" />
      <header className="mt-6 mb-10">
        <Button
          type="button"
          variant="ghost"
          className="text-orange-base mb-2 p-0 hover:text-orange-dark"
        >
          <Link to="/products" className="flex items-center gap-2">
            <ArrowLeft className="w-4" />
            <p className="text-action-sm">Voltar</p>
          </Link>
        </Button>
        <h1 className="text-title-md text-gray-500 font-semibold mb-2">
          Editar produto
        </h1>
        <p className="text-body-sm text-gray-300">
          Gerencie as informações do produto cadastrado
        </p>
      </header>

      {productData && categoryData ? (
        <div className="flex gap-6">
          <div
            className="max-h-[340px] w-full max-w-[415px] rounded-[20px] bg-center bg-cover"
            style={{
              backgroundImage: `url(${productData.product.attachments[0].url})`,
            }}
          />

          <ProductEditForm
            product={productData.product}
            categories={categoryData.categories}
          />
        </div>
      ) : (
        <div className="flex gap-6">
          <Skeleton className="w-[400px] h-[340px]" />
          <Skeleton className="w-[590px] h-[460px]" />
        </div>
      )}
    </div>
  )
}
