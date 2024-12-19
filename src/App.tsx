import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '@/components/layout/client/app.layout'
import RegisterPage from 'pages/client/register/register.page'
import LoginPage from 'pages/client/login/login.page'
import { fetchAccount } from 'services/api.service'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { doGetAccountAction } from 'redux/account/accountSlice'
import Loading from 'components/loading/loading'
import LayoutAdmin from 'components/layout/admin/layout.admin'
import ProtectedRoute from 'components/auth/protected.route'
import ManageUser from 'pages/admin/user/manage.user'
import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US';
import ManageBook from 'pages/admin/book/manage.book'
import HomePage from 'pages/client/home.page/home'
import BookPage from 'pages/client/book.page/book.page'



const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/book/:id',
        element: <BookPage />
      },
      {
        path: '/order',
        element: (
          <ProtectedRoute>
            <div>order page</div>
          </ProtectedRoute>
        )
      },
      {
        path: '/history',
        element: (
          <ProtectedRoute>
            <div>history page</div>
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <div>dashboard</div>
          </ProtectedRoute>
        )
      },
      {
        path: '/admin/user',
        element: (
          <ProtectedRoute>
            <ManageUser />
          </ProtectedRoute>
        )
      },
      {
        path: '/admin/order',
        element: (
          <ProtectedRoute>
            <div>order page</div>
          </ProtectedRoute>
        )
      },
      {
        path: '/admin/book',
        element: (
          <ProtectedRoute>
            <ManageBook />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
])


const App = () => {

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getAccount()
  }, [])

  const getAccount = async () => {

    if (window.location.pathname === '/login'
      || window.location.pathname === '/register'
    ) return

    setIsLoading(true)
    const res = await fetchAccount();
    if (res.data) {
      dispatch(doGetAccountAction(res.data.user))
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      {isLoading === false
        || window.location.pathname === '/'
        || window.location.pathname === '/login'
        || window.location.pathname === '/register'
        || window.location.pathname.startsWith('/book/')
        ?
        <ConfigProvider locale={enUS}>
          <RouterProvider router={router} />
        </ConfigProvider>
        :
        <Loading />
      }
    </>
  )
}

export default App