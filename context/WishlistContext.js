'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('pucho_wishlist');
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWishlist(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing wishlist', e);
      }
    }
  }, []);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const isExist = prev.find(item => item.id === product.id);
      let updated;
      if (isExist) {
        updated = prev.filter(item => item.id !== product.id);
      } else {
        updated = [...prev, product];
      }
      localStorage.setItem('pucho_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
