import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PATH, PATH_AUTH } from "./constants/paths";
import NotFound from "layouts/NotFound";
import MainLayout from "layouts/MainLayout/MainLayout";
import Product from "./modules/home/Product";

const Home = lazy(() => import("./modules/home/Home"));

const RouterConfig = () => {
  const createRoutes = useRoutes([
    // {
    //   path: PATH_AUTH.AUTH,
    //   element: <PublicGuard />,
    //   children: [
    //     {
    //       path: PATH_AUTH.AUTH,
    //       element: <Navigate to={PATH_AUTH.LOGIN} />
    //     },
    //     {
    //       path: PATH_AUTH.LOGIN,
    //       element: <Login />
    //     },
    //     {
    //       path: PATH_AUTH.REGISTER,
    //       element: <Register />
    //     }
    //   ]
    // },
    {
      path: PATH.HOME,
      element: (
        <MainLayout />
        // <AuthenticatedGuard>
        // </AuthenticatedGuard>
      ),
      children: [
        {
          path: PATH.HOME,
          element: <Navigate to={PATH.DASHBOARD} />
        },
        {
          path: PATH.DASHBOARD,
          element: <Home />
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
