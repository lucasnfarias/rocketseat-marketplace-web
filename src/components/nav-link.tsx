import { Link, LinkProps, useLocation } from 'react-router-dom'

export function NavLink(props: LinkProps) {
  const { pathname } = useLocation()

  const isNavLinkActive =
    pathname === props.to ||
    (String(props.to).includes('products') &&
      String(pathname).includes('products'))

  return (
    <Link
      data-current={isNavLinkActive}
      className="flex items-center gap-2 rounded-[10px] text-action-sm text-gray-300 hover:text-orange-base hover:bg-shape data-[current=true]:text-orange-base data-[current=true]:bg-shape px-4 py-3"
      {...props}
    />
  )
}
