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
import AdminLayout from '@/layouts/adminLayout/adminLayout';
import Dashboard from 'pages/admin/dashboard/dashboard';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import AirportManagement from '@/pages/admin/airportManagement/airportManagement';
import AccountManagement from '@/pages/admin/accountManagement/accountManagement';
import SeatManagement from '@/pages/admin/seatManagement/seatManagement';
import FlightManagement from '@/pages/admin/flightManagement/flightManagement';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PlaneManagement from './pages/admin/planeManagement/planeManagement';
import AdminBooking from './pages/admin/booking/adminBooking';
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
        path: "manage-airport",
        element: <AirportManagement />,
      },
      {
        path: "manage-flight",
        element: <FlightManagement />,
      },
      {
        path: "manage-seat",
        element: <SeatManagement />,
      },
      {
        path: "manage-account",
        element: <AccountManagement />,
      },
      {
        path: "manage-plane",
        element: <PlaneManagement />,
      },
    ]
  },
  {
    path: "/admin/manage-flight/booking/:flightId",
    element: <AdminBooking />,
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
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={enUS}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>,
)
