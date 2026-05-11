'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from '@/lib/i18n/useTranslations';
import LanguageSwitcher from './LanguageSwitcher';
import CartIcon from '@/components/cart/CartIcon';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: `/${locale}/`, label: t('home') },
    { href: `/${locale}/products/`, label: t('products') },
    { href: `/${locale}/about/`, label: t('about') },
    { href: `/${locale}/contact/`, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-cream-50/95 backdrop-blur-sm border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href={`/${locale}/`} 
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold text-primary-700" style={{ fontFamily: 'var(--font-display)' }}>
              MEM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-stone-600 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            <CartIcon />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-stone-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menú"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav className="flex flex-col space-y-4 pb-4 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-stone-600 hover:text-primary-600 transition-colors duration-200 font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
