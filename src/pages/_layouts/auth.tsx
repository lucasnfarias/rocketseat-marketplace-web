import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <img src="/logo.svg" alt="" className="absolute top-10 left-10" />
      <div className="flex bg-[url('/background.png')] bg-contain bg-no-repeat bg-center max-h-screen"></div>

      <div className="flex flex-col items-center justify-center p-6">
        <Outlet />
      </div>
    </div>
  )
}
