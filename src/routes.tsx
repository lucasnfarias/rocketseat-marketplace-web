import { NotFound } from '@/pages/404'
import { AppLayout } from '@/pages/_layouts/app'
import { AuthLayout } from '@/pages/_layouts/auth'
import { Dashboard } from '@/pages/app/dashboard'
import { Products } from '@/pages/app/products'
import { ProductCreate } from '@/pages/app/products/create'
import { ProductsEdit } from '@/pages/app/products/edit'
import { Login } from '@/pages/auth/login'
import { Register } from '@/pages/auth/register'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/products', element: <Products /> },
      { path: '/products/edit/:productId', element: <ProductsEdit /> },
      { path: '/products/create', element: <ProductCreate /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
