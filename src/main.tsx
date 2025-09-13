import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import './index.css';
import App from './App.tsx';
import { apolloClient } from './apollo';
import { AuthProvider, LocaleProvider } from './context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LocaleProvider>
        <AuthProvider>
          <ApolloProvider client={apolloClient}>
            <App />
          </ApolloProvider>
        </AuthProvider>
      </LocaleProvider>
    </BrowserRouter>
  </StrictMode>
);
