import { getProducts, GetProductsQuery } from '@/api/get-products'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductCard } from '@/pages/app/products/product-card'
import { ProductsFilter } from '@/pages/app/products/products-filter'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search')
  const status = searchParams.get('status')

  const { data: result, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', search, status],
    queryFn: () =>
      getProducts({
        search,
        status:
          status === 'all' ? null : (status as GetProductsQuery['status']),
      }),
  })

  return (
    <div className="w-full max-w-[1100px] mx-auto">
      <Helmet title="Produtos" />
      <header className="mt-10 mb-10">
        <h1 className="text-title-md font-dm-sans text-gray-500 mb-2">
          Seus produtos
        </h1>
        <p className="text-body-sm text-gray-300">
          Acesse gerencie a sua lista de produtos à venda
        </p>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <ProductsFilter />

        <div className="col-span-2 flex flex-wrap gap-4">
          {!isLoadingProducts && result
            ? result.products.map((product) => {
                return <ProductCard key={product.id} product={product} />
              })
            : Array.from({ length: 10 }).map((_, i) => {
                return (
                  <Skeleton
                    key={i}
                    className="h-[240px] rounded-[20px] p-1 w-[calc(50%-16px)]"
                  />
                )
              })}

          {!isLoadingProducts && !result?.products.length && (
            <h2 className="text-orange-base text-title-lg font-dm-sans font-semibold w-[60%] text-center m-auto">
              Você não tem nenhum produto cadastrado :(
            </h2>
          )}
        </div>
      </div>
    </div>
  )
}
