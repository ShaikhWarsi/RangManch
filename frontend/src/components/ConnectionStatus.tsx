'use client'

import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const { isDemoMode } = useAuth();

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await apiService.healthCheck();
        setIsOnline(true);
      } catch (error) {
        setIsOnline(false);
      }
    };

    // Check connection on mount
    checkConnection();

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isOnline === null && !isDemoMode) {
    return null; // Loading state
  }

  if (isOnline && !isDemoMode) {
    return null; // Don't show anything when online and in real mode
  }

  return (
    <div className="fixed top-20 left-4 z-50 space-y-2">
      {isOnline === false && (
        <div className="bg-amber-100 border border-amber-300 text-amber-800 px-3 py-2 rounded-lg text-sm font-medium shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span>Using demo data - backend offline</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;
