import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from '@/redux/store.ts';
import ReactQueryProvider from '@/components/ReactQueryProvider.tsx';
import { Toaster } from 'sonner';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ReactQueryProvider>
        <App />
        <Toaster />
      </ReactQueryProvider>
    </Provider>
  </StrictMode>,
);
