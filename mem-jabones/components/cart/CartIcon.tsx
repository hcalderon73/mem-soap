'use client';

import { useCart } from '@/lib/cart/CartContext';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartIconProps {
  className?: string;
}

export default function CartIcon({ className }: CartIconProps) {
  const { totalItems, setIsOpen } = useCart();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className={cn(
        'relative p-2 text-stone-600 hover:text-primary-600 transition-colors',
        className
      )}
      aria-label={`Carrito con ${totalItems} items`}
    >
      <ShoppingBag className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-fade-in">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </button>
  );
}
