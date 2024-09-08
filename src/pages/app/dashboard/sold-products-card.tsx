import { getProductsSold } from '@/api/get-products-sold'
import { Card, CardContent } from '@/components/ui/card'
import { MetricCardSkeleton } from '@/pages/app/dashboard/metric-card-skeleton'
import { useQuery } from '@tanstack/react-query'
import { Receipt } from 'lucide-react'

export function SoldProductsCard() {
  const { data: productsSold } = useQuery({
    queryKey: ['metrics', 'sold-products'],
    queryFn: getProductsSold,
  })

  return (
    <Card className="rounded-[20px] flex p-3">
      <CardContent className="flex items-center gap-4 p-0">
        <div className="flex bg-blue-light items-center justify-center w-[80px] h-[86px] rounded-[12px]">
          <Receipt className="text-blue-dark w-9 h-9" />
        </div>

        <div className="flex flex-col gap-2 justify-center">
          {productsSold ? (
            <>
              <h3 className="text-title-lg font-dm-sans text-gray-400">
                {productsSold.amount}
              </h3>
              <p className="text-body-xs text-gray-300 w-1">
                Produtos vendidos
              </p>
            </>
          ) : (
            <MetricCardSkeleton />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
