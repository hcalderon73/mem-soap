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
      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/hero/hero-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-stone-900/50" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium drop-shadow-md">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto drop-shadow">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="products/"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-500 transition-colors duration-200 shadow-xl hover:shadow-2xl"
              >
                {t('hero.ctaPrimary')}
              </Link>
              <Link
                href="about/"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/40 hover:bg-white/30 hover:border-white/60 transition-all duration-200"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
