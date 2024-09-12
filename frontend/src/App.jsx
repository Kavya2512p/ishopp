import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebsiteLayout from './pages/website/Layout'
import AdminLayout from './pages/admin/Layout'
import Home from './pages/website/Home'
import Store from './pages/website/Store'
import Dashboard from './pages/admin/Dashboard'
import Cart from './pages/website/Cart'
import CategoryView from './pages/admin/Category/View'
import CategoryAdd from './pages/admin/Category/Add'
import CategoryEdit from './pages/admin/Category/Edit'
import ProductView from './pages/admin/Product/View'
import ProductAdd from './pages/admin/Product/Add'
import ProductEdit from './pages/admin/Product/Edit'
import AdminLogin from './pages/admin/Login'
import { useDispatch } from 'react-redux'
import { lsToCart } from '../reducers/Cart'
import { MdJavascript } from 'react-icons/md'
import LoginPage from './pages/website/Login'



export default function App() {

  const dispatcher = useDispatch();
  
  useEffect(
    () =>{  
      dispatcher(lsToCart());
    },[]
  )

  const routes = createBrowserRouter(
    [
      {
        path:"",
        element:<WebsiteLayout/>,
        children:[
          {
            path:"",
            element:<Home/>
          },
          {
            path:"store/:category_slug?",
            element:<Store/>
          },
          {
            path:"cart",
            element:<Cart/>
          }

        ]
      },
      {
        path:"/admin",
        element:<AdminLayout/>,
        children:[
          {
            path:"",
            element:<Dashboard/>
          },
          {
            path:"category",
            element:<CategoryView/>
          },
          {
            path:"category/add",
            element:<CategoryAdd/>
          },
          {
            path:"category/edit/:id",
            element:<CategoryEdit/>
          }
          ,
          {
            path:"product",
            element:<ProductView/>
          },
          {
            path:"product/add",
            element:<ProductAdd/>
          },
          {
            path:"product/edit/:id",
            element:<ProductEdit/>
          }
        ]
      },
      {
        path:"/admin/login",
        element:<AdminLogin/>
      },
      {
          path: "login",
          element: <LoginPage />
      }
    ]
  )
  return (
    <RouterProvider router ={routes}/>
  )
}
