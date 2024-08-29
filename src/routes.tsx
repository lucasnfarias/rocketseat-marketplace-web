import { NotFound } from '@/pages/404'
import { AppLayout } from '@/pages/_layouts/app'
import { Home } from '@/pages/app/home'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Home /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
