import { AccountMenu } from '@/components/account-menu'

export function Header() {
  return (
    <div className="flex h-20 items-center gap-6 px-6 border-b border-shape">
      <img src="/logo-symbol.png" alt="" />
      <div className="ml-auto">
        <AccountMenu />
      </div>
    </div>
  )
}
