import './index.css'
import axios from "axios";
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BASE_API_URL, TOKEN } from "./helpers/api";
import NotFound from "./pages/not-found/not-found";
import Layout from "./layouts/menu/layout"; 
import AuthLayout from "./layouts/auth-layout/auth-layout";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { IProduct } from "./interfaces/product.interface";
import PrivateRoute from "./helpers/private-route";
import { Provider } from "react-redux";
import { store } from "./store/store";

const Menu = lazy(() => import("./pages/menu/menu"))
const Cart = lazy(() => import("./pages/cart/cart"))
const Product = lazy(() => import("./pages/product/product"))
const routes = createBrowserRouter([
	{
		element:
		 (<PrivateRoute>
			<Layout/>
			</PrivateRoute>
		 ),
		path: "/",
		children: [
			{
				path: "/",
				element: <Menu />,
			},
			{
				path: "cart",
				element: <Cart />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
			{
				path: "product/:id",
				element: <Product />,
				errorElement: <h2>Ошибка...</h2>,
				loader: async ({ params }) => {
					const { id } = params;
					const { data } = await axios<IProduct[]>(`${BASE_API_URL}/products/${id}`, {
						headers: {
							Authorization: `Bearer ${TOKEN}`,
						},
					});
					return data;
				},
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout/>,
		children: [
			{
				path: "login",
				element: <Login/>,
			},
			{
				path: "register",
				element: <Register/>,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
		<Provider store={store}>
  <Suspense fallback = { <h1>Загрузка старницы...</h1>}>
    <RouterProvider router={routes}/>
  </Suspense>
		</Provider>
  </StrictMode>,
)
