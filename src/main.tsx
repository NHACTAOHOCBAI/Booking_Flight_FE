import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserLayout from 'pages/client/userLayout/userLayout'

import AboutUsPage from 'pages/client/aboutUsPage/aboutUsPage'
import BookingPage from 'pages/client/bookingPage/bookingPage'
import LoginPage from 'pages/auth/loginPage/loginPage'
import SignUpPage from 'pages/auth/signUpPage/signUpPage'
import './index.css'
import AdminLayout from '@/layouts/adminLayout/adminLayout'
import Dashboard from 'pages/admin/dashboard/dashboard'
import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import AirportManagement from '@/pages/admin/airportManagement/airportManagement'

import SeatManagement from '@/pages/admin/seatManagement/seatManagement'
import FlightManagement from '@/pages/admin/flightManagement/flightManagement'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PlaneManagement from './pages/admin/planeManagement/planeManagement'
import AdminBooking from './pages/admin/booking/adminBooking'
import CityManagement from './pages/admin/cityManagement/cityManagement'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import AirlineManagement from './pages/admin/airlineManagement/airlineManagement'
import HomePage from './pages/client/homePage/homePage'
import { AppProvider } from './context/app.context'
import AccountManagement from '@/pages/admin/accountManagement/accountManagement'
import TicketManagement from './pages/admin/ticketManagement/ticketManagement'
import RoleManagement from './pages/admin/roleManagement/roleManagement'
import ErrorPage from './components/ErrorPage/ErrorPage'
import ProtectedRoute from './components/ProtectedRoute'
import RejectedRoute from './components/RejectedRoute'
import SuccessRegisterPage from './pages/auth/signUpPage/signUpSuccess'
import MyProfile from './pages/client/myProfile/myProfile'
import { PersistGate } from 'redux-persist/integration/react'
import ThirdStep from './pages/admin/booking/thirdStep/thirdStep'
import BookingFailed from './components/ErrorPage/BookingFailed'
import LoginCallbackPage from './pages/auth/LoginCallbackPage '

// function ProtectedRoute() {
//   const { isAuthenticated } = useContext(AppContext)
//   return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
// }

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutUsPage />
      },
      {
        path: '/booking',
        element: <BookingPage />
      },
      {
        path: '/myProfile',
        element: <MyProfile />
      },
      {
        path: '/booking/passenger',
        element: <AdminBooking />
      },
      {
        path: '/payment/success',
        element: <ThirdStep />
      },
      {
        path: '/payment/fail',
        element: <BookingFailed />
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'manage-city',
        element: (
          <ProtectedRoute>
            <CityManagement />
          </ProtectedRoute>
        )
      },
      {
        path: 'manage-airport',
        element: (
          <ProtectedRoute>
            <AirportManagement />
          </ProtectedRoute>
        )
      },
      {
        path: 'manage-flight',
        element: (
          <ProtectedRoute>
            <FlightManagement />
          </ProtectedRoute>
        )
      },

      {
        path: 'manage-seat',
        element: (
          <ProtectedRoute>
            <SeatManagement />
          </ProtectedRoute>
        )
      },
      {
        path: 'manage-account',
        element: (
          <ProtectedRoute>
            <AccountManagement />
          </ProtectedRoute>
        )
      },
      {
        path: 'manage-plane',
        element: (
          <ProtectedRoute>
            <PlaneManagement />
          </ProtectedRoute>
        )
      },
      {
        path: 'manage-airline',
        element: (
          <ProtectedRoute>
            <AirlineManagement />
          </ProtectedRoute>
        )
      },
      {
        path: 'manage-ticket',
        element: (
          <ProtectedRoute>
            <TicketManagement />
          </ProtectedRoute>
        )
      },
      {
        path: 'manage-role',
        element: (
          <ProtectedRoute>
            <RoleManagement />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <RejectedRoute />,
    children: [
      {
        index: true,
        element: <LoginPage />
      }
    ]
  },
  {
    path: '/callback',
    element: <LoginCallbackPage />
  },
  {
    path: '/signup',
    element: <RejectedRoute />,
    children: [
      {
        index: true,
        element: <SignUpPage />
      }
    ]
  },
  {
    path: '/signup/signupSuccess',
    element: <SuccessRegisterPage />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5000,
      gcTime: 5 * 60 * 1000
    }
  }
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={enUS}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppProvider>
            <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={router} />
            </PersistGate>
          </AppProvider>
        </Provider>
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>
)
