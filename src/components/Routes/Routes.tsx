import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';

import { StatisticsPage } from './StatisticsPage';
import { TimerPage } from './TimerPage';
import { NotFoundPage } from './NotFoundPage';
import { BaseLayout } from 'components/BaseLayout';

export function Routes() {
  const router = createHashRouter([
    {
      path: '/',
      element: (
        <BaseLayout>
          <main aria-live="assertive">
            <Outlet />
          </main>
        </BaseLayout>
      ),
      children: [
        {
          path: '/',
          element: <TimerPage />,
        },
        {
          path: '/statistics',
          element: <StatisticsPage />,
        },
        {
          path: '/*',
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
