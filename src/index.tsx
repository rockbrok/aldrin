import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FilterContextProvider from './context/FilterContext';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

import './index.css';

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);