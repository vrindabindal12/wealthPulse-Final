'use client';
import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

export default function NotificationToast() {
  const { notification } = usePortfolio();

  if (!notification) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top duration-300">
      <div className={`max-w-md w-full ${isSuccess ? 'bg-green-600' : 'bg-red-600'} text-white p-4 rounded-lg shadow-lg flex items-center gap-3`}>
        {isSuccess ? (
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
        )}
        <p className="flex-1 text-sm font-medium">{notification.message}</p>
      </div>
    </div>
  );
}