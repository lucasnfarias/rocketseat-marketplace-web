import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { UsersRound } from 'lucide-react'

interface DailyVisitorsChartTooltipProps {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}

export function DailyVisitorsChartTooltip({
  active = true,
  payload = [],
  label = '',
}: DailyVisitorsChartTooltipProps) {
  if (active && payload && payload.length) {
    const visitorsCount = payload[0].value
    const formattedDate = format(new Date(label), "dd 'de' MMMM", {
      locale: ptBR,
    })

    return (
      <div className="bg-white rounded-[8px] p-3 drop-shadow-md">
        <p className="text-gray-400 text-label-sm uppercase mb-2">
          {formattedDate}
        </p>

        <div className="flex gap-2">
          <UsersRound className="w-4 h-4 text-gray-300" />
          <p className="text-gray-300 text-body-xs">
            {visitorsCount} visitantes
          </p>
        </div>
      </div>
    )
  }

  return null
}
