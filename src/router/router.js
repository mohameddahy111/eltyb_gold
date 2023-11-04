import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProdectRouter from "../components/ProdectRouter";
import CheckOut from "../pages/CheckOut";
import Orders from "../pages/Orders";
import WishListPage from "../pages/WishListPage";
import Dash from "../admin/pages/Dash";
import DashLayout from "../admin/layout/DashLayout";
import AllOrders from "../admin/pages/AllOrders";
import UserDetils from "../admin/pages/UserDetils";
import AddProductes from "../admin/pages/AddProductes";
import AllProductes from "../admin/pages/AllProductes";
import ProductDetils from "../admin/pages/ProductDetils";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path:'/user/:id/orders',
        element:<Orders/>
      }, 
      {
        path:'/user/wishList/',
        element:<WishListPage/>
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProdectRouter >
        <DashLayout />
      </ProdectRouter>
    ),
    children: [
      {
        index: true,
        element:<Dash/>
      },
      {
        path:"/dashboard/all_orders",
      element:<AllOrders/>
      },
      {
        path:"/dashboard/all_user/:id",
      element:<UserDetils/>
      },
      {
        path:"/dashboard/products",
      element:<AllProductes/>
      },
      {
        path:"/dashboard/products/add_product",
      element:<AddProductes/>
      },
      {
        path:"/dashboard/products/:slug",
      element:<ProductDetils/>
      },
    ],
  },
]);
