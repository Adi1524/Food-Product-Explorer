import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductDetail from "../components/ProductDetail";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/product/:code",
    element: <ProductDetail />,
  },
]);

export default appRouter;
