'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { CartItem, CartContextType } from './types';

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'SET_OPEN'; payload: boolean };

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // Check if we can add more (stock validation)
        const newQuantity = existingItem.quantity + action.payload.quantity;
        if (newQuantity > existingItem.stock) {
          return state; // Can't add more than stock
        }
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: newQuantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      // Validate against stock
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && action.payload.quantity > item.stock) {
        return state; // Can't exceed stock
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'SET_OPEN':
      return {
        ...state,
        isOpen: action.payload,
      };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('mem-cart');
      if (savedCart) {
        try {
          const items = JSON.parse(savedCart);
          dispatch({ type: 'SET_ITEMS', payload: items });
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mem-cart', JSON.stringify(state.items));
    }
  }, [state.items]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity: 1 },
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const setIsOpen = useCallback((isOpen: boolean) => {
    dispatch({ type: 'SET_OPEN', payload: isOpen });
  }, []);

  // Check if we can add a specific quantity to cart
  const canAddToCart = useCallback((productId: string, quantity: number): boolean => {
    const existingItem = state.items.find((item) => item.id === productId);
    if (!existingItem) return true; // New item, can add
    return (existingItem.quantity + quantity) <= existingItem.stock;
  }, [state.items]);

  // Get available stock for a product
  const getAvailableStock = useCallback((productId: string): number => {
    const existingItem = state.items.find((item) => item.id === productId);
    if (!existingItem) return 0; // Should get from product data
    return existingItem.stock - existingItem.quantity;
  }, [state.items]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isOpen: state.isOpen,
      setIsOpen,
      canAddToCart,
      getAvailableStock,
    }),
    [state.items, state.isOpen, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, setIsOpen, canAddToCart, getAvailableStock]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
