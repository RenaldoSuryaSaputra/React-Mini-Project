import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import "./index.css";
import { auth } from "./config/firebase";
import Root from "./routes/root";
import ErrorPage from "./pages/error";
import Home from "./pages/home";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Marketplace from "./pages/marketplace";
import AdminDashboard from "./components/landing-page/admin";
import DetailProduct from "./components/product/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "/login",
        element: <Login/>,
        loader: () => {
          if (auth?.currentUser?.uid) {
            return redirect('/admin')
          }
          return null
        },
      },
      {
        path: "/register",
        element: <Register/>,
        loader: () => {
          if (auth?.currentUser?.uid) {
            return redirect('/admin')
          }
          return null
        },
      },
      {
        path: "/marketplace",
        element: <Marketplace/>
      },
      {
        path: "/marketplace/products/:id",
        element: <DetailProduct/>
      }
    ],
  },
  // Admin Routes
  {
    path: "/admin",
    element: <AdminDashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AdminDashboard />,
        index: true,
        loader: () => {
          if (!auth?.currentUser?.uid) {
            return redirect('/')
          }
          return null
        },
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
