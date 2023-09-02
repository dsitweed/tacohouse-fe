import { createBrowserRouter } from 'react-router-dom';
import Dev from '../pages/Dev';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dev />,
  },
]);

export default router;
