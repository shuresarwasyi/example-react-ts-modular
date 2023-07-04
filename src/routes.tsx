import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/main-layout/MainLayout";
import Home from "./modules/home/Home";
import Member from "./modules/member/Member";

// Create the routes configuration using createBrowserRouter
const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "member",
        element: <Member />,
      },
    ],
  },
]);

export default routes;
