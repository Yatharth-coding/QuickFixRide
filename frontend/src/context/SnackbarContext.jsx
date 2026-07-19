import React, { createContext, useState, useContext, useCallback } from 'react';

const SnackbarContext = createContext();

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
    type: 'success', // 'success' | 'error' | 'info'
  });

  const showSnackbar = useCallback((message, type = 'success') => {
    setSnackbar({ isOpen: true, message, type });
    setTimeout(() => {
      setSnackbar(prev => ({ ...prev, isOpen: false }));
    }, 3000); // Hide after 3 seconds
  }, []);

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      {snackbar.isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: snackbar.type === 'error' ? '#ef4444' : snackbar.type === 'info' ? '#3b82f6' : '#10b981',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          minWidth: '300px',
          justifyContent: 'center',
          fontWeight: '500',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          {snackbar.message}
          <button 
            onClick={hideSnackbar}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
          >
            &times;
          </button>
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
