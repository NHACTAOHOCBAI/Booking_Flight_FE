import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserLayout from 'pages/client/userLayout/userLayout';
import HomePage from 'pages/client/homePage/homePage';
import AboutUsPage from 'pages/client/aboutUsPage/aboutUsPage';
import BookingPage from 'pages/client/bookingPage/bookingPage';
import LoginPage from 'pages/auth/loginPage/loginPage';
import SignUpPage from 'pages/auth/signUpPage/signUpPage';
import "./global.css"
import AdminLayout from 'pages/admin/adminLayout/adminLayout';
import Dashboard from 'pages/admin/dashboard/dashboard';
import FlightManagement from 'pages/admin/flightManagement/flightManagement';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "manageflight",
        element: <FlightManagement />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={enUS}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>,
)
