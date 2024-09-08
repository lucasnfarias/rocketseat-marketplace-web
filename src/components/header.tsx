import { AccountMenu } from '@/components/account-menu'
import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { ChartLine, Package, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <div className="flex items-center justify-between self-center gap-6 px-6 border-b border-shape w-full h-20">
      <img src="/logo-symbol.png" alt="" />

      <nav className="flex items-center gap-2">
        <NavLink to="/">
          <ChartLine className="h-4 w-4" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/products">
          <Package className="h-4 w-4" />
          <p>Produtos</p>
        </NavLink>
      </nav>

      <div className="flex items-center gap-4">
        <Link to="/products/create">
          <Button
            type="button"
            className="bg-orange-base text-white gap-2 rounded-[10px]"
          >
            <Plus className="w-4 h-4" />
            Novo produto
          </Button>
        </Link>
        <AccountMenu />
      </div>
    </div>
  )
}
