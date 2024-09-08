import { GetCategoriesResponse } from '@/api/get-categories'
import { GetProductResponse } from '@/api/get-product'
import { GetProductsResponse } from '@/api/get-products'
import { updateProduct, UpdateProductResponse } from '@/api/update-product'
import { uploadAttachments } from '@/api/upload-attachments'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ImageUp, Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const productEditForm = z.object({
  productImage: z
    .custom<FileList>()
    .refine(
      (files) => !files || files[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
  title: z.string(),
  price: z.string(),
  description: z.string(),
  categoryId: z.string(),
})

type ProductEditForm = z.infer<typeof productEditForm>

interface ProductEditFormProps {
  product: GetProductResponse['product']
  categories: GetCategoriesResponse['categories']
}

export function ProductEditForm({ product, categories }: ProductEditFormProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting: isLoadingProductEdit },
  } = useForm<ProductEditForm>({
    resolver: zodResolver(productEditForm),
    defaultValues: {
      title: product.title,
      price: (product.priceInCents / 100)
        .toLocaleString('pt-BR', { minimumFractionDigits: 2 })
        .replace(/\./g, ''),
      description: product.description,
      categoryId: product.category.id,
    },
  })

  const isSoldOrDeactivated = product.status !== 'available'

  function updateProductOnCache({ product }: UpdateProductResponse) {
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
          products: cacheData.products.map((cacheProduct) => {
            if (cacheProduct.id === product.id) {
              return { ...cacheProduct, ...product }
            }

            return cacheProduct
          }),
        })
      }

      if (cacheData.product) {
        queryClient.setQueryData<GetProductResponse>(cacheKey, {
          product: { ...cacheData.product, ...product },
        })
      }
    })
  }

  const { mutateAsync: updateProductsFn } = useMutation({
    mutationFn: updateProduct,
    async onSuccess({ product }) {
      updateProductOnCache({ product })
    },
  })

  async function handleProductEdit(data: ProductEditForm) {
    try {
      let attachmentsIds = [product.attachments[0].id]
      if (data.productImage && data.productImage[0]) {
        const files = new FormData()
        files.append('files', data.productImage[0])

        const { attachments } = await uploadAttachments({ files })
        attachmentsIds = [attachments[0].id]
      }

      await updateProductsFn({
        params: { productId: product.id },
        body: {
          title: data.title,
          description: data.description,
          priceInCents:
            Number(data.price.replace(/\./g, '').replace(',', '.')) * 100,
          categoryId: data.categoryId,
          attachmentsIds,
        },
      })

      toast.success('Produto atualizado com sucesso!')
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
          toast.error('Ocorreu um erro ao tentar atualizar o produto.')
      }
    }
  }

  return (
    <form className="flex gap-6" onSubmit={handleSubmit(handleProductEdit)}>
      <Controller
        name="productImage"
        control={control}
        render={({ field: { name, onChange, value } }) => {
          return (
            <Label
              htmlFor="productImage"
              style={{
                backgroundImage: `url(${value && value[0] ? URL.createObjectURL(value[0]) : product.attachments[0].url})`,
                cursor: isSoldOrDeactivated ? 'not-allowed' : 'normal',
              }}
              className="group max-h-[340px] w-full max-w-[415px] rounded-[20px] bg-center bg-cover hover:cursor-pointer transition-all relative"
            >
              <div className="flex flex-col items-center justify-center w-full h-full bg-transparent text-transparent rounded-[20px] group-hover:bg-black group-hover:bg-opacity-20 group-hover:text-white">
                <ImageUp className="h-10 w-10 mb-4" strokeWidth={1.5} />
                <p className="text-body-sm text-center max-w-[150px] normal-case font-normal">
                  Selecione a imagem do produto
                </p>
              </div>
              <Input
                type="file"
                id="productImage"
                name={name}
                className="hidden"
                onChange={(e) => onChange(e.target.files)}
                disabled={isSoldOrDeactivated}
              />
              {errors.productImage && (
                <p className="text-rose-600 text-xs mt-1 absolute">
                  {errors.productImage.message?.toString()}
                </p>
              )}
            </Label>
          )
        }}
      />

      <Card className="flex-1 rounded-[20px] p-6">
        <CardHeader className="flex-row items-center justify-between mb-6 p-0 space-y-0">
          <h3 className="text-title-sm font-dm-sans text-gray-300 font-semibold">
            Dados do produto
          </h3>
          <StatusChip status={product.status} />
        </CardHeader>

        <CardContent className="p-0">
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
                disabled={isSoldOrDeactivated}
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
                disabled={isSoldOrDeactivated}
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
            disabled={isSoldOrDeactivated}
            {...register('description')}
          />

          <Label
            className="text-label-md text-xs text-gray-300"
            htmlFor="category"
          >
            Categoria
          </Label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field: { name, onChange, value } }) => {
              return (
                <Select
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={isSoldOrDeactivated}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => {
                      return (
                        <SelectItem key={category.id} value={category.id}>
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
              disabled={isSoldOrDeactivated}
              type="button"
              onClick={() => navigate('/products')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-[10px] bg-orange-base text-white w-full"
              disabled={isSoldOrDeactivated || isLoadingProductEdit}
            >
              {isLoadingProductEdit ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Salvar e atualizar'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
