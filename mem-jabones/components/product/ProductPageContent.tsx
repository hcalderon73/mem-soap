'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart/CartContext';
import { Minus, Plus, ShoppingCart, AlertCircle } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/useTranslations';

interface ProductPageContentProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    stock: number;
    category?: string;
    ingredients?: string[];
    weight?: string;
  };
  slug: string;
}

export default function ProductPageContent({ product, slug }: ProductPageContentProps) {
  const { addItem, setIsOpen, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const t = useTranslations('product');
  const tProducts = useTranslations('products');

  // Check current quantity in cart
  const cartItem = items.find(item => item.id === product.id);
  const currentCartQuantity = cartItem?.quantity || 0;
  const availableStock = product.stock - currentCartQuantity;
  const isOutOfStock = product.stock === 0;
  const canAddMore = availableStock > 0;

  const handleAddToCart = () => {
    if (quantity > availableStock) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      slug: slug,
      image: product.image,
      stock: product.stock,
    });
    
    // Add multiple items if quantity > 1
    for (let i = 1; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        slug: slug,
        image: product.image,
        stock: product.stock,
      });
    }
    
    setIsOpen(true);
    setQuantity(1); // Reset quantity
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < availableStock) setQuantity(quantity + 1);
  };

  return (
    <div className="animate-fade-in">
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square bg-cream-100 rounded-2xl overflow-hidden">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              {product.category && (
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                  {product.category}
                </span>
              )}

              <h1 className="text-4xl font-bold text-stone-800">
                {product.name}
              </h1>
              
              <p className="text-2xl text-primary-600 font-semibold">
                €{product.price.toFixed(2)}
                {product.weight && (
                  <span className="text-base text-stone-500 font-normal ml-2">
                    / {product.weight}
                  </span>
                )}
              </p>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                {isOutOfStock ? (
                  <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {t('outOfStock')}
                  </span>
                ) : availableStock <= 5 ? (
                  <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {tProducts('stock.lowStock', { count: availableStock })}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    {tProducts('stock.inStock', { count: availableStock })}
                  </span>
                )}
              </div>

              <p className="text-stone-600 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-stone-800">{t('ingredients')}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-stone-100 text-stone-600 text-sm rounded"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4 space-y-6">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="text-stone-700 font-medium">{t('quantity')}:</span>
                  <div className="flex items-center border border-stone-300 rounded-lg">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="p-3 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label={t('decreaseQty')}
                    >
                      <Minus className="h-4 w-4 text-stone-600" />
                    </button>
                    <span className="w-12 text-center font-semibold text-stone-800">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= availableStock || isOutOfStock}
                      className="p-3 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label={t('increaseQty')}
                    >
                      <Plus className="h-4 w-4 text-stone-600" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || !canAddMore}
                  className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors active:scale-95 disabled:bg-stone-300 disabled:cursor-not-allowed disabled:hover:bg-stone-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>
                    {isOutOfStock 
                      ? t('outOfStock')
                      : !canAddMore 
                        ? t('maxInCart')
                        : t('addToCart')}
                  </span>
                </button>

                {/* Info badges */}
                <div className="flex items-center space-x-4 text-sm text-stone-500 pt-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('natural')}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('handmade')}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('eco')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
