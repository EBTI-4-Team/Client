import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout.tsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ path: '/' }],
  },
]);

export default router;
