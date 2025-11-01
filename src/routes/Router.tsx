import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout.tsx';
import LoginPage from '../pages/Login/LoginPage.tsx';
import RegisterPage from '../pages/Login/RegisterPage.tsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/' },
      { path: '/Login', element: <LoginPage /> },
      { path: '/Register', element: <RegisterPage /> },
    ],
  },
]);

export default router;
