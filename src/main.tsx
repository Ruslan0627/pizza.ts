import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./pages/menu/menu";
import Cart from "./pages/cart/cart";
import NotFound from "./pages/not-found/not-found";
import Layout from "./layouts/menu/layout";
import Product from "./pages/product/product";
import axios from "axios";
import { BASE_API_URL, TOKEN } from "./helpers/api";
const routes = createBrowserRouter( [
  {
    element:<Layout/>,
    path:"/",
    children:[
      {
        path:"/",
        element:<Menu/>
      },
      {
        path:"cart",
        element:<Cart/>,
      },
      {
        path:"*",
        element:<NotFound/>
      },
      {
        path:"product/:id",
        element:<Product/>,
        errorElement:<h2>Ошибка...</h2>,
        loader:async ({ params }) => {
          const { id } = params
          const {data} = await axios(`${BASE_API_URL}/products/${id}`, {
            headers:{
              "Authorization":`Bearer ${TOKEN}`
            }
          })
          return data;
         }
      },]
  }, 
    
  {
    path:"*",
    element:<NotFound/>
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
