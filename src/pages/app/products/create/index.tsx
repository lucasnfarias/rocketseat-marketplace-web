import { getCategories } from '@/api/get-categories'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductCreateForm } from '@/pages/app/products/create/product-create-form'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

export function ProductCreate() {
  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return (
    <div className="w-full max-w-[1100px] mx-auto">
      <Helmet title="Criar produto" />
      <header className="flex flex-col justify-between mt-10 mb-10">
        <h1 className="text-title-md font-dm-sans text-gray-500 font-semibold mb-2">
          Novo produto
        </h1>
        <p className="text-body-sm text-gray-300">
          Cadastre um produto para venda no marketplace
        </p>
      </header>

      {categoryData ? (
        <ProductCreateForm categories={categoryData.categories} />
      ) : (
        <div className="flex gap-6">
          <Skeleton className="w-[415px] h-[340px]" />
          <Skeleton className="w-[685px] h-[460px]" />
        </div>
      )}
    </div>
  )
}
