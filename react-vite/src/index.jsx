import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import { ProductCard, ProductSection } from "./components/ProductSection";
import Counter from "./components/Counter";
import Comment from "./components/Comment";

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
  useParams,
} from "react-router-dom";

const ReactHeadingElement = React.createElement(
  "h1",
  { classNameName: "heading" },
  "Hello React Developer..❤️",
); // <h1>Hello React Developer...</h1>

// facebook developer do like this

// JSX => javascript xml , html in js, xml like systax
const paraElement = <p>Hello para</p>;
// browser understand js,
// browseer understand jsx ?

// babel js => React.createElemt()
// jsx =>      js object            => browser
// console.log(paraElement);

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      {/* 
        if path == "/comment" => return
        else if path == "/counter" => return
      */}
      <Footer />
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ProductSection />
    </div>
  );
};

const ErrorPage = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <Link
              to={"/"}
              className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >
              Back to Homepage
            </Link>
            {/* <a
              href="/"
              className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >
              Back to Homepage
            </a> */}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductDetailPage = () => {
  const data = useParams();

  console.log("params data", data);

  return (
    <div>
      <h1>Product detial page {data.productId}</h1>
    </div>
  );
};

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
        path: "/productDetail/:productId", // params => object { productId: 123 }
        element: <ProductDetailPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));
reactRoot.render(<RouterProvider router={Route} />);
