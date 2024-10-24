import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PATH } from "./constants/paths";
import NotFound from "layouts/NotFound";
import MainLayout from "layouts/MainLayout/MainLayout";
import Product from "./modules/home/Product/Product";
import DashBoard from "./modules/home/Dashboard/Dashboard";

// const DashBoard = lazy(() => import("./modules/home/Dashboard/Dashboard"));

const RouterConfig = () => {
  const createRoutes = useRoutes([
    {
      path: PATH.HOME,
      element: <MainLayout />,
      children: [
        {
          path: PATH.HOME,
          element: <Navigate to={PATH.DASHBOARD} />
        },
        {
          path: PATH.DASHBOARD,
          element: <DashBoard />
        },
        {
          path: PATH.PRODUCT,
          element: <Product />
        }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);
  return <Suspense>{createRoutes}</Suspense>;
};

export default RouterConfig;
