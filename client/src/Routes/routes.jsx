import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import ErrorPageDashboard from "../Pages/Error/ErrorPageDashboard";
import { routesGenerator } from "../utils/routesGenerator";
import { adminRoutes } from "./Admin.Routes";
import ErrorPage from "../common/ErrorPage/ErrorPage";
import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import MainLayout from "../Layouts/Home/MainLayout";
import ProductDetails from "../Pages/Home/ProductDetails/ProductDetails";
import Shop from "../Pages/Shop/Shop";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import AdminProtectedRoute from "./AdminPanelProtectedRoutes/AdminProtectedRoute";
import Checkout from "../Pages/Checkout/Checkout";
import ProtectedRoutes from "./UserProtectedRoutes/ProtectedRoutes";
import Success from "../Pages/Success/Success";
import PaymentError from "../Pages/Error/PaymentError";

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
        path: "/shop",
        element: <Shop/>,
      },
      {
        path: "/checkout",
        element: 
      <ProtectedRoutes role={"user"}>
        <Checkout/>
      </ProtectedRoutes>
      },
      {
        path: "/success",
        element: 
      <ProtectedRoutes role={"user"}>
        <Success/>
      </ProtectedRoutes>
      },
      {
        path: "/cancel",
        element: 
      <ProtectedRoutes role={"user"}>
        <PaymentError/>
      </ProtectedRoutes>
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BACKEND_URL}/product/${params.id}`)
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
     <AdminProtectedRoute>
        <DashboardLayout />
     </AdminProtectedRoute>
 
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
