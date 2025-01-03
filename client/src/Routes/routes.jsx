import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPageDashboard from "../Pages/Error/ErrorPageDashboard";
import { routesGenerator } from "../utils/routesGenerator";
import { adminRoutes } from "./Admin.Routes";
import ErrorPage from "../common/ErrorPage/ErrorPage";
import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import MainLayout from "../Layouts/Home/MainLayout";
import ProductDetails from "../Pages/Home/ProductDetails/ProductDetails";
import Shop from "../Pages/Shop/Shop";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop/>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
        loader: () => fetch('/products.json')

      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      // <AdminProtectedRoute>
        <DashboardLayout />
      // </AdminProtectedRoute>
    ),
    errorElement: <ErrorPageDashboard />,
    children: routesGenerator(adminRoutes),
  },
  // {
  //   path: "/user",
  //   children: routesGenerator(CustomerRoutes),
  //   element: (
  //     <ProtectedRoutes role="customer">
  //       <CustomerDashboardLayout />
  //     </ProtectedRoutes>
  //   ),
  // },
]);
