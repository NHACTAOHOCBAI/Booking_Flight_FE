import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserLayout from 'pages/client/userLayout/userLayout';
import HomePage from 'pages/client/homePage/homePage';
import AboutUsPage from 'pages/client/aboutUsPage/aboutUsPage';
import BookingPage from 'pages/client/bookingPage/bookingPage';
import LoginPage from 'pages/auth/loginPage/loginPage';
import SignUpPage from 'pages/auth/signUpPage/signUpPage';
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
    <RouterProvider router={router} />
  </StrictMode>,
)
