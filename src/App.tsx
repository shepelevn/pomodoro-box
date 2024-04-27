import React from 'react';

import { StoreProvider } from 'easy-peasy';

import { easyPeasyStore } from 'utils/easyPeasy/store';

import { Routes } from './components/Routes';

function App() {
  return (
    <StoreProvider store={easyPeasyStore}>
      <Routes />
    </StoreProvider>
  );
}

export default App;
