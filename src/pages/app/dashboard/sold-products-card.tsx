import { Card, CardContent } from '@/components/ui/card'
import { Receipt } from 'lucide-react'

export function SoldProductsCard() {
  return (
    <Card className="rounded-[20px] flex p-3">
      <CardContent className="flex items-center gap-4 p-0">
        <div className="flex bg-blue-light items-center justify-center w-[80px] h-[86px] rounded-[12px]">
          <Receipt className="text-blue-dark w-9 h-9" />
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-title-lg text-gray-400">24</h3>
          <p className="text-body-xs text-gray-300 w-1">Produtos vendidos</p>
        </div>
      </CardContent>
    </Card>
  )
}
