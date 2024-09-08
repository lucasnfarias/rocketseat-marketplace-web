import { createProduct } from '@/api/create-product'
import { GetCategoriesResponse } from '@/api/get-categories'
import { GetProductResponse } from '@/api/get-product'
import { GetProductsResponse } from '@/api/get-products'
import { UpdateProductResponse } from '@/api/update-product'
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

const productCreateForm = z.object({
  productImage: z
    .custom<FileList>()
    .refine((files) => files && files?.length, 'Image is mandatory.')
    .refine(
      (files) => !files || files[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
  title: z.string().min(1),
  price: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string(),
})

type ProductCreateForm = z.infer<typeof productCreateForm>

interface ProductCreateFormProps {
  categories: GetCategoriesResponse['categories']
}

export function ProductCreateForm({ categories }: ProductCreateFormProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting: isLoadingProductCreate },
  } = useForm<ProductCreateForm>({
    resolver: zodResolver(productCreateForm),
  })

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

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    async onSuccess({ product }) {
      updateProductOnCache({ product })
    },
  })

  async function handleProductCreation(data: ProductCreateForm) {
    try {
      const files = new FormData()
      files.append('files', data.productImage[0])

      const { attachments } = await uploadAttachments({ files })

      await createProductFn({
        title: data.title,
        description: data.description,
        priceInCents:
          Number(data.price.replace(/\./g, '').replace(',', '.')) * 100,
        categoryId: data.categoryId,
        attachmentsIds: [attachments[0].id],
      })

      toast.success('Produto criado com sucesso!')
      navigate('/products')
    } catch (error) {
      console.error(error)
      switch ((error as AxiosError).status) {
        case 404:
          toast.error(
            'Vendedor, categoria ou imagem do produto não foi encontrada.',
          )
          break
        default:
          toast.error('Ocorreu um erro ao tentar criar o produto.')
      }
    }
  }

  return (
    <form className="flex gap-6" onSubmit={handleSubmit(handleProductCreation)}>
      <Controller
        name="productImage"
        control={control}
        render={({ field: { name, onChange, value } }) => {
          return (
            <Label
              htmlFor="productImage"
              style={{
                backgroundImage: `url(${value && value[0] ? URL.createObjectURL(value[0]) : ''})`,
              }}
              className="group max-h-[340px] w-full max-w-[415px] rounded-[20px] bg-center bg-cover hover:cursor-pointer transition-all relative"
            >
              {!value && (
                <div className="absolute -z-20 flex flex-col items-center justify-center w-full h-full bg-shape text-gray-300 rounded-[20px]">
                  <ImageUp
                    className="h-10 w-10 mb-4 text-orange-base"
                    strokeWidth={1.5}
                  />
                  <p className="text-body-sm text-center max-w-[150px] normal-case font-normal">
                    Selecione a imagem do produto
                  </p>
                </div>
              )}

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
                {...register('title')}
              />
              {errors.title && (
                <p className="text-rose-600 text-xs mt-1 absolute">
                  {errors.title.message?.toString()}
                </p>
              )}
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
                {...register('price')}
              />
              <span className="absolute top-[50%] text-orange-base">R$</span>
              {errors.price && (
                <p className="text-rose-600 text-xs mt-1 absolute">
                  {errors.price.message?.toString()}
                </p>
              )}
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
            {...register('description')}
          />
          {errors.description && (
            <p className="text-rose-600 text-xs absolute -mt-4">
              {errors.description.message?.toString()}
            </p>
          )}

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
                <Select name={name} onValueChange={onChange} value={value}>
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Selecione" />
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
          {errors.categoryId && (
            <p className="text-rose-600 text-xs mt-1 absolute">
              {errors.categoryId.message?.toString()}
            </p>
          )}

          <div className="flex gap-4 mt-10">
            <Button
              variant="outline"
              className="rounded-[10px] border-2 border-orange-base bg-transparent text-orange-base w-full"
              type="button"
              onClick={() => navigate('/products')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-[10px] bg-orange-base text-white w-full"
              disabled={isLoadingProductCreate}
            >
              {isLoadingProductCreate ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Salvar e publicar'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
