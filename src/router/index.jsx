import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/index.jsx";
import Login from "../pages/Login/index.jsx";
import { AuthRoute } from '@/components/AuthRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Layout/></AuthRoute>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

export default router;