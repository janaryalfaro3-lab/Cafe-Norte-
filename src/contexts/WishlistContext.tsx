import React, { createContext, useContext, useState, useEffect } from 'react';

interface Blend {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface WishlistContextType {
  wishlist: Blend[];
  addToWishlist: (blend: Blend) => void;
  removeFromWishlist: (id: string | number) => void;
  isInWishlist: (id: string | number) => boolean;
  toggleWishlist: (blend: Blend) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Blend[]>(() => {
    const saved = localStorage.getItem('cafe-norte-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cafe-norte-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (blend: Blend) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === blend.id)) return prev;
      return [...prev, blend];
    });
  };

  const removeFromWishlist = (id: string | number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string | number) => wishlist.some((item) => item.id === id);

  const toggleWishlist = (blend: Blend) => {
    if (isInWishlist(blend.id)) {
      removeFromWishlist(blend.id);
    } else {
      addToWishlist(blend);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
