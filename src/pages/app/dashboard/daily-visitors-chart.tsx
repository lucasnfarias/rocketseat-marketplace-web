import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { DailyVisitorsChartTooltip } from '@/pages/app/dashboard/daily-visitors-chart-tooltip'
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

const chartData = [
  {
    date: '2024-02-01',
    visitors: 100,
  },
  {
    date: '2024-02-02',
    visitors: 200,
  },
  {
    date: '2024-02-03',
    visitors: 50,
  },
  {
    date: '2024-02-04',
    visitors: 10,
  },
  {
    date: '2024-02-05',
    visitors: 90,
  },
  {
    date: '2024-02-06',
    visitors: 100,
  },
  {
    date: '2024-02-07',
    visitors: 130,
  },
  {
    date: '2024-02-01',
    visitors: 100,
  },
  {
    date: '2024-02-02',
    visitors: 200,
  },
  {
    date: '2024-02-03',
    visitors: 50,
  },
  {
    date: '2024-02-04',
    visitors: 10,
  },
  {
    date: '2024-02-05',
    visitors: 90,
  },
  {
    date: '2024-02-06',
    visitors: 100,
  },
  {
    date: '2024-02-07',
    visitors: 130,
  },
  {
    date: '2024-02-01',
    visitors: 100,
  },
  {
    date: '2024-02-02',
    visitors: 200,
  },
  {
    date: '2024-02-03',
    visitors: 50,
  },
  {
    date: '2024-02-04',
    visitors: 10,
  },
  {
    date: '2024-02-05',
    visitors: 90,
  },
  {
    date: '2024-02-06',
    visitors: 100,
  },
  {
    date: '2024-02-07',
    visitors: 130,
  },
  {
    date: '2024-02-01',
    visitors: 100,
  },
  {
    date: '2024-02-02',
    visitors: 200,
  },
  {
    date: '2024-02-03',
    visitors: 50,
  },
  {
    date: '2024-02-04',
    visitors: 10,
  },
  {
    date: '2024-02-05',
    visitors: 90,
  },
  {
    date: '2024-02-06',
    visitors: 100,
  },
  {
    date: '2024-02-07',
    visitors: 130,
  },
]

export function DailyVisitorsChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  return (
    <Card className="rounded-[20px] h-full">
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <CardTitle className="text-gray-500 text-title-sm">
          Visitantes
        </CardTitle>

        <DateRangePicker date={dateRange} onDateChange={setDateRange} />
      </CardHeader>

      <CardContent className="h-full">
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
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
                width={80}
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
                dataKey="visitors"
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
