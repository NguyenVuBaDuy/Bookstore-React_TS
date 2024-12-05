import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from 'components/layout/app.layout'
import RegisterPage from 'pages/register/register.page'
import LoginPage from 'pages/login/login.page'
import { fetchAccount } from 'services/api.service'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { doGetAccountAction } from 'redux/account/accountSlice'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <div>home page</div>
      },
      {
        path: 'book',
        element: <div>book page</div>
      },
      {
        path: 'order',
        element: <div>order page</div>
      },
      {
        path: 'history',
        element: <div>history page</div>
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

  useEffect(() => {
    getAccount()
  }, [])

  const getAccount = async () => {
    const res = await fetchAccount();
    if (res.data) {
      dispatch(doGetAccountAction(res.data.user))
    }
  }

  return (
    <RouterProvider router={router} />
  )
}

export default App