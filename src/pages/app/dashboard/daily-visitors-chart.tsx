import { getDailyVisitors } from '@/api/get-daily-visitors'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { DailyVisitorsChartTooltip } from '@/pages/app/dashboard/daily-visitors-chart-tooltip'
import { useQuery } from '@tanstack/react-query'
import { format, subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

export function DailyVisitorsChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const { data: chartData } = useQuery({
    queryKey: ['metrics', 'views', 'days'],
    queryFn: getDailyVisitors,
  })

  return (
    <Card className="rounded-[20px] h-full">
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <CardTitle className="text-gray-500 text-title-sm font-dm-sans">
          Visitantes
        </CardTitle>

        <DateRangePicker date={dateRange} onDateChange={setDateRange} />
      </CardHeader>

      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={chartData.viewsPerDay}
              style={{ fontSize: 12 }}
              margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
            >
              <XAxis
                dataKey="date"
                stroke="#888"
                axisLine={false}
                tickLine={false}
                dy={16}
                tickFormatter={(value) => format(new Date(value), 'dd')}
              />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                dx={-4}
                width={30}
              />

              <CartesianGrid
                vertical={false}
                strokeDasharray="10 12"
                stroke={colors.gray[200]}
              />

              <Tooltip content={<DailyVisitorsChartTooltip />} />
              <Line
                type="natural"
                strokeWidth={2}
                dataKey="amount"
                stroke="#5ec5fd"
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
