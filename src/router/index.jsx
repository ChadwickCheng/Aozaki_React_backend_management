import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/index.jsx";
import Login from "../pages/Login/index.jsx";
import { AuthRoute } from '@/components/AuthRoute.jsx'
// import Home from "@/pages/Home/index.jsx";
// import Article from "@/pages/Article/index.jsx";
// import Publish from "@/pages/Publish/index.jsx";
import { Suspense, lazy } from "react";

// 1. lazy导入
const Home = lazy(()=>import('@/pages/Home/index.jsx'));
const Article = lazy(()=>import('@/pages/Article/index.jsx'));
const Publish = lazy(()=>import('@/pages/Publish/index.jsx'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Layout/></AuthRoute>,
    children: [
      {
        index: true,
        element: <Suspense fallback="loading"><Home/></Suspense>
      },
      {
        path: 'article',
        element: <Suspense fallback="loading"><Article/></Suspense>
      },
      {
        path: 'publish',
        element: <Suspense fallback="loading"><Publish/></Suspense>
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

export default router;