import React from 'react';

import { Header } from './Header';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
