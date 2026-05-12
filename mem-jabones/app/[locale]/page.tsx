"use client";

import { Leaf, Heart, Recycle, Shield } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/lib/i18n/useTranslations';

export default function HomePage() {
  const t = useTranslations();

  const features = [
    { 
      icon: Leaf, 
      title: t('features.items.natural.title'),
      description: t('features.items.natural.description')
    },
    { 
      icon: Heart, 
      title: t('features.items.handmade.title'),
      description: t('features.items.handmade.description')
    },
    { 
      icon: Recycle, 
      title: t('features.items.eco.title'),
      description: t('features.items.eco.description')
    },
    { 
      icon: Shield, 
      title: t('features.items.cruelty.title'),
      description: t('features.items.cruelty.description')
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-cream-50 to-cream-100 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800 mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-700 mb-4 font-medium">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="products/"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {t('hero.ctaPrimary')}
              </Link>
              <Link
                href="about/"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-full border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">{t('stats.productsCount')}</p>
              <p className="text-stone-600">{t('stats.products')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">{t('stats.naturalPercent')}</p>
              <p className="text-stone-600">{t('stats.natural')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">{t('stats.handmadeText')}</p>
              <p className="text-stone-600">{t('stats.handmade')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">{t('stats.happyCount')}</p>
              <p className="text-stone-600">{t('stats.happy')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-lg text-stone-600">
              {t('features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-stone-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
