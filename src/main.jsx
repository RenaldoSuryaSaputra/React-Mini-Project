import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./pages/error";
import Home from "./pages/home";
import Login from "./components/form/login";
import Register from "./components/form/register";
import ListProduct from "./pages/products";
import AdminRoot from "./routes/admin";
import AdminDashboard from "./components/dashboard/admin";

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
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/products",
        element: <ListProduct/>
      }
    ],
  },
  // Admin Routes
  {
    path: "/admin",
    element: <AdminRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AdminDashboard />,
        index: true
      },
      {
        path: "/admin/list-product",
        element: <Register/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
