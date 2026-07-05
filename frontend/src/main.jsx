import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(220 30% 4%)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                },
                success: {
                  iconTheme: {
                    primary: 'hsl(185 80% 50%)',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
