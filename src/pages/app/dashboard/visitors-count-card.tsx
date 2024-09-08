import { Card, CardContent } from '@/components/ui/card'
import { UsersRound } from 'lucide-react'

import { getVisitorsCount } from '@/api/get-visitors-count'
import { MetricCardSkeleton } from '@/pages/app/dashboard/metric-card-skeleton'
import { useQuery } from '@tanstack/react-query'

export function VisitorsCountCard() {
  const { data: visitors } = useQuery({
    queryKey: ['metrics', 'views'],
    queryFn: getVisitorsCount,
  })

  return (
    <Card className="rounded-[20px] flex p-3">
      <CardContent className="flex items-center gap-4 p-0">
        <div className="flex bg-blue-light items-center justify-center w-[80px] h-[86px] rounded-[12px]">
          <UsersRound className="text-gray-300 w-9 h-9" />
        </div>

        <div className="flex flex-col gap-2 justify-center">
          {visitors ? (
            <>
              <h3 className="text-title-lg font-dm-sans text-gray-400">
                {Number(visitors.amount).toLocaleString('pt-BR')}
              </h3>
              <p className="text-body-xs text-gray-300 w-1">
                Pessoas vistantes
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
