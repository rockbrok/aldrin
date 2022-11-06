import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FilterContextProvider from './context/FilterContext';
import { QueryClient, QueryClientProvider } from 'react-query';

import './index.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);