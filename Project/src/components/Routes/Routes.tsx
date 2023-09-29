import React from 'react';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import { StatisticsPage } from './StatisticsPage';
import { TimerPage } from './TimerPage';
import { NotFoundPage } from './NotFoundPage';
import { BaseLayout } from 'components/BaseLayout';
import { useStatistics } from 'hooks/useStatistics';

export function Routes() {
  const router = createBrowserRouter([
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
