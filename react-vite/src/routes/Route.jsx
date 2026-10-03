import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import HomePage from "../pages/HomePage";
import Counter from "../pages/Counter";
// import ProductDetailPage from "../pages/ProductDetailPage";
import ErrorPage from "../pages/ErrorPage";
import Comment from "../pages/Comment";
// import Contact from "../pages/Contact/Contact";
import ImageCom from "../pages/ImageCom/ImageCom";
import { lazy, Suspense } from "react";
import ComponentA from "../pages/props/ComponentA";
import Expensive from "../pages/Expensive";

const ProductDetail = lazy(() => import("../pages/ProductDetailPage"));
const Contact = lazy(() => import("../pages/Contact/Contact"));

const Route = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // header, footer
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/comment",
        element: <Comment />,
      },
      {
        path: "/counter",
        element: <Counter />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/image",
        element: <ImageCom />,
      },
      {
        path: "/props",
        element: <ComponentA />,
      },
      {
        path: "/expensive",
        element: <Expensive />,
      },
      {
        path: "/productDetail/:productId",
        element: (
          <Suspense fallback={"<><>><><>logding<><>><<>>><"}>
            <ProductDetail />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default Route;
