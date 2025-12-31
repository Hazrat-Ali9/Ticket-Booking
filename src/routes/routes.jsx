import { createBrowserRouter } from "react-router";
import Mainlayouts from "../layouts/Mainlayouts";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import Dashboard from "../layouts/Dashboard";
import PrivetRoutes from "./PrivetRoutes";
import AllTickets from "../pages/AllTickets/AllTickets";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import MyProfile from "../components/MyProfile/MyProfile";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCencel from "../pages/Dashboard/Payment/PaymentCencel";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Mainlayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: 'about',
        Component: About
      },
      {
        path: 'contact',
        Component: Contact
      },
      {
        path: "/all-tickets",
        element: (
          <PrivetRoutes>
            <AllTickets />
          </PrivetRoutes>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <PrivetRoutes>
            <MyProfile />
          </PrivetRoutes>
        ),
      },
      {
        path: "/all-tickets/:id",
        element: (
          <PrivetRoutes>
            <TicketDetails />
          </PrivetRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoutes>
        <Dashboard />
      </PrivetRoutes>
    ),
  },
  {
    path: "payment-success",
    element: <PaymentSuccess></PaymentSuccess>,
  },
  {
    path: "payment-cancelled",
    element: <PaymentCencel></PaymentCencel>,
  },
]);
