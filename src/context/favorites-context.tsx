"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface FavoritesContextType {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('onplan_favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
    }
  }, []);

  const updateLocalStorage = (newFavorites: number[]) => {
    try {
      localStorage.setItem('onplan_favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  };

  const addFavorite = useCallback((id: number) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(id)) return prevFavorites;
      const newFavorites = [...prevFavorites, id];
      updateLocalStorage(newFavorites);
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.filter(favId => favId !== id);
      updateLocalStorage(newFavorites);
      return newFavorites;
    });
  }, []);
  
  const isFavorite = useCallback((id: number) => {
    return favorites.includes(id);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
