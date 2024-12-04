import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/layout/app.layout'

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
    element: <div>login page</div>
  },
  {
    path: '/register',
    element: <div>register</div>
  }
])


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App