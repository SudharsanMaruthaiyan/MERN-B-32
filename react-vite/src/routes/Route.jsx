import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import HomePage from "../pages/HomePage";
import Counter from "../pages/Counter";
import ProductDetailPage from "../pages/ProductDetailPage";
import ErrorPage from "../pages/ErrorPage";
import Comment from "../pages/Comment";
import Contact from "../pages/Contact/Contact";
import ImageCom from "../pages/ImageCom/ImageCom";

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
        path: "/productDetail/:productId", // params => object { productId: 123 }
        element: <ProductDetailPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default Route;
