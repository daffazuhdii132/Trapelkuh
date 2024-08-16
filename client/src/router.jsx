import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import TestPage from "./pages/TestPage";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import MainLayout from "./pages/MainLayout";
import MyTickets from "./pages/MyTickets";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/my-tickets",
        element: <MyTickets />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
]);

export default router;
