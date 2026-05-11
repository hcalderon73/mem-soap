"use client";

import { useTranslations } from '@/lib/i18n/useTranslations';
import { useCart } from '@/lib/cart/CartContext';
import Link from 'next/link';
import { useLocale } from '@/lib/i18n/useTranslations';
import productsData from '@/data/products.json';
import { AlertCircle } from 'lucide-react';

export default function ProductsPage() {
  const t = useTranslations('products');
  const { addItem, setIsOpen, items } = useCart();
  const locale = useLocale();

  const handleAddToCart = (product: typeof productsData.products[0]) => {
    // Check if we can add more
    const cartItem = items.find(item => item.id === product.id);
    const currentQty = cartItem?.quantity || 0;
    
    if (currentQty >= product.stock) {
      return; // Can't add more
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      image: product.image,
      stock: product.stock,
    });
    setIsOpen(true);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-cream-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-stone-600">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsData.products.map((product) => {
              const cartItem = items.find(item => item.id === product.id);
              const currentQty = cartItem?.quantity || 0;
              const availableStock = product.stock - currentQty;
              const isOutOfStock = product.stock === 0;
              const canAdd = availableStock > 0;

              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <Link href={`/${locale}/product/${product.slug}/`}>
                    <div className="aspect-square bg-cream-100 overflow-hidden relative">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {/* Stock Badge */}
                      {isOutOfStock && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                          Agotado
                        </div>
                      )}
                      {!isOutOfStock && availableStock <= 3 && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                          ¡Últimas {availableStock}!
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/${locale}/product/${product.slug}/`}>
                      <h3 className="text-xl font-semibold text-stone-800 mb-2 hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-stone-600 mb-4">
                      {product.description}
                    </p>
                    
                    {/* Stock Info */}
                    <div className="mb-4">
                      {isOutOfStock ? (
                        <span className="text-red-600 text-sm font-medium flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Sin stock
                        </span>
                      ) : availableStock <= 3 ? (
                        <span className="text-amber-600 text-sm font-medium">
                          Solo quedan {availableStock} unidades
                        </span>
                      ) : (
                        <span className="text-green-600 text-sm font-medium">
                          En stock
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        €{product.price.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        disabled={!canAdd}
                        className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors active:scale-95 disabled:bg-stone-300 disabled:cursor-not-allowed"
                      >
                        {isOutOfStock ? 'Agotado' : 'Añadir'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
