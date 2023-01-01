import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

import './index.css';
import { ContextProvider } from './context/Context';

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ContextProvider >
        <App />
      </ContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);