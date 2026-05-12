'use client';

import { useCart } from '@/lib/cart/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from '@/lib/i18n/useTranslations';
import { cn } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const locale = useLocale();
  const t = useTranslations('cart');

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-bold text-stone-800">{t('title')}</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
            aria-label={t('close')}
          >
            <X className="h-6 w-6 text-stone-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-stone-300 mb-4" />
              <p className="text-stone-600 text-lg mb-2">{t('empty')}</p>
              <p className="text-stone-400 text-sm mb-6">{t('emptyMessage')}</p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
              >
                {t('continueShopping')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const maxReached = item.quantity >= item.stock;
                const availableToAdd = item.stock - item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-cream-50 rounded-xl"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-cream-100 rounded-lg flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-stone-400 text-xs text-center">{item.name.slice(0, 10)}</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/${locale}/product/${item.slug}/`}
                        onClick={() => setIsOpen(false)}
                        className="font-semibold text-stone-800 hover:text-primary-600 transition-colors block truncate"
                      >
                        {item.name}
                      </Link>
                      <p className="text-primary-600 font-medium mt-1">
                        €{item.price.toFixed(2)}
                      </p>

                      {/* Stock Warning */}
                      {maxReached && (
                        <p className="text-amber-600 text-xs mt-1 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {t('stockMax')}
                        </p>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-200 rounded transition-colors"
                          aria-label={t('decreaseQty')}
                        >
                          <Minus className="h-4 w-4 text-stone-600" />
                        </button>
                        <span className="w-8 text-center font-medium text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={maxReached}
                          className="p-1 hover:bg-stone-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label={t('increaseQty')}
                        >
                          <Plus className="h-4 w-4 text-stone-600" />
                        </button>
                      </div>

                      {/* Stock Info */}
                      <p className="text-xs text-stone-500 mt-1">
                        {availableToAdd > 0 
                          ? t('stockAvailable', { count: availableToAdd })
                          : t('stockReached')}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors self-start"
                      aria-label={t('remove')}
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                );
              })}

              {/* Clear Cart */}
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-red-500 text-sm hover:text-red-600 transition-colors"
                >
                  {t('clear')}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-stone-600">{t('subtotal')}</span>
              <span className="text-2xl font-bold text-stone-800">
                €{totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-stone-400">
              {t('shippingNote')}
            </p>
            <button className="w-full py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors">
              {t('checkout')}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              {t('continueShopping')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
