import { NotFound } from '@/pages/404'
import { AppLayout } from '@/pages/_layouts/app'
import { AuthLayout } from '@/pages/_layouts/auth'
import { Home } from '@/pages/app/home'
import { Login } from '@/pages/auth/login'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Home /> }],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
