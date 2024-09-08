import { getCategories } from '@/api/get-categories'
import { getProduct, GetProductResponse } from '@/api/get-product'
import { GetProductsResponse } from '@/api/get-products'
import { updateProductStatus } from '@/api/update-product-status'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductEditForm } from '@/pages/app/products/edit/product-edit-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ArrowLeft, BadgePlus, Ban, Check } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

type ProductStatus = 'available' | 'sold' | 'cancelled'

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

  const isSold = productData?.product.status === 'sold'
  const isDeactivated = productData?.product.status === 'cancelled'

  const queryClient = useQueryClient()

  function updateProductStatusOnCache(
    productId: string,
    status: ProductStatus,
  ) {
    const productsListCache = queryClient.getQueriesData<
      GetProductsResponse & GetProductResponse
    >({
      queryKey: ['products'],
    })

    productsListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      if (cacheData.products) {
        queryClient.setQueryData<GetProductsResponse>(cacheKey, {
          ...cacheData,
          products: cacheData.products.map((product) => {
            if (product.id === productId) {
              return { ...product, status }
            }

            return product
          }),
        })
      }

      if (cacheData.product) {
        queryClient.setQueryData<GetProductResponse>(cacheKey, {
          product: { ...cacheData.product, status },
        })
      }
    })
  }

  const {
    mutateAsync: updateProductStatusFn,
    isPending: isUpdatingProductStatus,
  } = useMutation({
    mutationFn: updateProductStatus,
    async onSuccess(_, { productId, status }) {
      updateProductStatusOnCache(productId, status)
    },
  })

  async function handleStatusChange({
    productId,
    status,
  }: {
    productId: string
    status: ProductStatus
  }) {
    try {
      await updateProductStatusFn({ productId, status })

      toast.success('Status do produto atualizado com sucesso!')
    } catch (error) {
      console.error(error)
      switch ((error as AxiosError).status) {
        case 403:
          toast.error('Você não é o dono desse produto.')
          break
        case 404:
          toast.error('Produto não encontrado.')
          break
        default:
          toast.error(
            'Ocorreu um erro ao tentar atualizar o status do produto.',
          )
      }
    }
  }

  return (
    <div className="w-full max-w-[1100px] mx-auto">
      <Helmet title="Editar produto" />
      <header className="flex justify-between mt-2 mb-10">
        <div>
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
          <h1 className="text-title-md font-dm-sans text-gray-500 font-semibold mb-2">
            Editar produto
          </h1>
          <p className="text-body-sm text-gray-300">
            Gerencie as informações do produto cadastrado
          </p>
        </div>

        <div className="flex items-end justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            className="flex items-center text-action-sm text-orange-base p-0 hover:text-orange-dark h-fit"
            disabled={!productData || isUpdatingProductStatus}
            onClick={() =>
              handleStatusChange({
                productId: productData?.product.id as string,
                status: isSold || isDeactivated ? 'available' : 'sold',
              })
            }
          >
            {isSold || isDeactivated ? (
              <>
                <BadgePlus className="h-4 w-4 mr-2" />
                Marcar como disponível
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Marcar como vendido
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="flex items-center text-action-sm text-orange-base p-0 hover:text-orange-dark h-fit"
            disabled={
              !productData || isUpdatingProductStatus || isDeactivated || isSold
            }
            onClick={() =>
              handleStatusChange({
                productId: productData?.product.id as string,
                status: 'cancelled',
              })
            }
          >
            <Ban className="h-4 w-4 mr-2" />
            Desativar anúncio
          </Button>
        </div>
      </header>

      {productData && categoryData ? (
        <ProductEditForm
          product={productData.product}
          categories={categoryData.categories}
        />
      ) : (
        <div className="flex gap-6">
          <Skeleton className="w-[415px] h-[340px]" />
          <Skeleton className="w-[685px] h-[460px]" />
        </div>
      )}
    </div>
  )
}
