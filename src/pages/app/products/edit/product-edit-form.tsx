import { GetCategoriesResponse } from '@/api/get-categories'
import { GetProductResponse } from '@/api/get-product'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { StatusChip } from '@/pages/app/products/status-chip'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { z } from 'zod'

const productsEditForm = z.object({
  title: z.string(),
  price: z.string(),
  description: z.string(),
  category: z.string(),
})

type ProductsEditForm = z.infer<typeof productsEditForm>

interface ProductEditFormProps {
  product: GetProductResponse['product']
  categories: GetCategoriesResponse['categories']
}

export function ProductEditForm({ product, categories }: ProductEditFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting: isLoadingProductEdit },
  } = useForm<ProductsEditForm>({
    resolver: zodResolver(productsEditForm),
    defaultValues: {
      title: product.title,
      price: (product.priceInCents / 100)
        .toLocaleString('pt-BR')
        .replace(/\./g, ''),
      description: product.description,
      category: product.category.slug,
    },
  })

  const isSoldOrInactive = product.status !== 'available'

  function handleProductEdit(data: ProductsEditForm) {
    console.log(data)
  }

  return (
    <Card className="flex-1 rounded-[20px] p-6">
      <CardHeader className="flex-row items-center justify-between mb-6 p-0 space-y-0">
        <h3 className="text-title-sm text-gray-300 font-semibold">
          Dados do produto
        </h3>
        <StatusChip status={product.status} />
      </CardHeader>

      <CardContent className="p-0">
        <form onSubmit={handleSubmit(handleProductEdit)}>
          <div className="flex gap-4 mb-5">
            <div className="w-full">
              <Label
                className="text-label-md text-xs text-gray-300"
                htmlFor="title"
              >
                Título
              </Label>
              <Input
                type="text"
                id="title"
                placeholder="O nome do seu produto"
                disabled={isSoldOrInactive}
                {...register('title')}
              />
            </div>

            <div className="relative">
              <Label
                className="text-label-md text-xs text-gray-300"
                htmlFor="price"
              >
                Valor
              </Label>
              <Input
                type="text"
                id="price"
                placeholder="100,00"
                className="pl-6"
                disabled={isSoldOrInactive}
                {...register('price')}
              />
              <span className="absolute top-[50%] text-orange-base">R$</span>
            </div>
          </div>

          <Label
            className="text-label-md text-xs text-gray-300"
            htmlFor="description"
          >
            Descrição
          </Label>
          <Textarea
            id="description"
            className="resize-none mb-5"
            placeholder="Uma descrição épica aqui..."
            disabled={isSoldOrInactive}
            {...register('description')}
          />

          <Label
            className="text-label-md text-xs text-gray-300"
            htmlFor="category"
          >
            Categoria
          </Label>
          <Controller
            name="category"
            control={control}
            render={({ field: { name, onChange, value } }) => {
              return (
                <Select
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={isSoldOrInactive}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => {
                      return (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.title}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              )
            }}
          />

          <div className="flex gap-4 mt-10">
            <Button
              variant="outline"
              className="rounded-[10px] border-2 border-orange-base bg-transparent text-orange-base w-full"
              disabled={isSoldOrInactive}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-[10px] bg-orange-base text-white w-full"
              disabled={isSoldOrInactive}
            >
              Salvar e atualizar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
