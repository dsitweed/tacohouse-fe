import { createBrowserRouter } from 'react-router-dom';
import Dev from '../pages/Dev';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dev />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
