import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const productFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
})

type ProductFiltersSchema = z.infer<typeof productFiltersSchema>

export function ProductsFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const status = searchParams.get('status') ?? ''

  const { register, handleSubmit, control } = useForm<ProductFiltersSchema>({
    resolver: zodResolver(productFiltersSchema),
    defaultValues: {
      search,
      status,
    },
  })

  function handleFilters({ search, status }: ProductFiltersSchema) {
    setSearchParams((state) => {
      if (search) {
        state.set('search', search)
      } else {
        state.delete('search')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      return state
    })
  }

  return (
    <Card className="col-span-1 rounded-[20px] flex flex-col p-3 h-fit">
      <CardHeader>
        <CardTitle className="text-title-sm font-dm-sans text-gray-300 text-[1.25rem]">
          Filtrar
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFilters)}>
          <Input
            type="search"
            placeholder="Pesquisar"
            {...register('search')}
            className="mb-5"
          />
          <Controller
            name="status"
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Select
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="available">Anunciado</SelectItem>
                    <SelectItem value="sold">Vendido</SelectItem>
                    <SelectItem value="cancelled">Desativado</SelectItem>
                  </SelectContent>
                </Select>
              )
            }}
          />

          <Button
            type="submit"
            className="bg-orange-base text-action-md rounded-[10px] w-full h-[56px] mt-10 text-white"
          >
            Aplicar filtro
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
