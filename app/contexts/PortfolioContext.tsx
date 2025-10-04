'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PortfolioItem {
  id: string;
  name: string;
  symbol: string;
  type: 'crypto' | 'stock';
  price: number;
  image?: string;
  addedAt: Date;
  marketCap?: number;
  change?: number;
}

interface PortfolioContextType {
  portfolio: PortfolioItem[];
  addToPortfolio: (item: PortfolioItem) => void;
  removeFromPortfolio: (id: string) => void;
  isInPortfolio: (id: string) => boolean;
  showNotification: (message: string, type: 'success' | 'error') => void;
  notification: { message: string; type: 'success' | 'error' } | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load portfolio from localStorage on mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('wealthpulse-portfolio');
    if (savedPortfolio) {
      try {
        const parsed = JSON.parse(savedPortfolio);
        // Convert addedAt strings back to Date objects
        const portfolioWithDates = parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setPortfolio(portfolioWithDates);
      } catch (error) {
        console.error('Error loading portfolio:', error);
      }
    }
  }, []);

  // Save portfolio to localStorage whenever it changes
  useEffect(() => {
    if (portfolio.length > 0) {
      localStorage.setItem('wealthpulse-portfolio', JSON.stringify(portfolio));
    }
  }, [portfolio]);

  const addToPortfolio = (item: PortfolioItem) => {
    if (!isInPortfolio(item.id)) {
      setPortfolio(prev => [...prev, item]);
      showNotification(`${item.name} added to portfolio successfully!`, 'success');
    } else {
      showNotification(`${item.name} is already in your portfolio!`, 'error');
    }
  };

  const removeFromPortfolio = (id: string) => {
    const item = portfolio.find(p => p.id === id);
    setPortfolio(prev => prev.filter(p => p.id !== id));
    if (item) {
      showNotification(`${item.name} removed from portfolio!`, 'success');
    }
  };

  const isInPortfolio = (id: string) => {
    return portfolio.some(item => item.id === id);
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        addToPortfolio,
        removeFromPortfolio,
        isInPortfolio,
        showNotification,
        notification
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}