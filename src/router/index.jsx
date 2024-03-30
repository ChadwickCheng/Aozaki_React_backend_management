import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/index.jsx";
import Login from "../pages/Login/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

export default router;