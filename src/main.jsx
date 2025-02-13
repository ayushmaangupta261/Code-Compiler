import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store/index.js'
import Home from './pages/Home.jsx'
import EditorPage from './pages/EditorPage.jsx'
import CreateAndJoinPage from './pages/CreateAndJoinPage.jsx'
import { Toaster } from 'react-hot-toast'
import Auth from './pages/Auth.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />
      },
      {
        path: "/create-and-join",
        element: <CreateAndJoinPage />
      },
      {
        path: "/editor/:roomId",
        element: <EditorPage />
      },
         ],
  },
])



createRoot(document.getElementById('root')).render(

  <Provider store={store}>

    <RouterProvider router={router} />
    <Toaster position="top-right" reverseOrder={false} toastOptions={
      {
        success: {
          theme: {
            primary: "green-400"
          }
        }
      }
    } />
  </Provider>

)
