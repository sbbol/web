import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './store/AppContext';
import { ChatProvider } from './store/ChatContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
