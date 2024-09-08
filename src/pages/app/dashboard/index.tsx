import { AdvertisedProductsCard } from '@/pages/app/dashboard/advertised-products-card'
import { DailyVisitorsChart } from '@/pages/app/dashboard/daily-visitors-chart'
import { SoldProductsCard } from '@/pages/app/dashboard/sold-products-card'
import { VisitorsCountCard } from '@/pages/app/dashboard/visitors-count-card'
import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  return (
    <div className="w-full max-w-[1100px] mx-auto">
      <Helmet title="Dashboard" />
      <header className="mt-10 mb-10">
        <h1 className="text-title-md font-dm-sans text-gray-500 mb-2">
          Últimos 30 dias
        </h1>
        <p className="text-body-sm text-gray-300">
          Confira as estatísticas da sua loja no último mês
        </p>
      </header>

      <div className="grid grid-cols-4 grid-rows-1 gap-6">
        <div className="flex flex-col col-span-1 gap-[15px]">
          <SoldProductsCard />
          <AdvertisedProductsCard />
          <VisitorsCountCard />
        </div>

        <div className="col-span-3">
          <DailyVisitorsChart />
        </div>
      </div>
    </div>
  )
}
