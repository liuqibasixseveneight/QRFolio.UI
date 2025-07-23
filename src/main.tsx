import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import './index.css';
import App from './App.tsx';
import { apolloClient } from './apollo';
import { AuthProvider } from './context/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
