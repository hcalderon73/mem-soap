"use client";

import { Leaf, Heart, Recycle, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-primary-50 via-cream-50 to-cream-100 py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-primary-700 mb-4 font-medium">
                {t('hero.subtitle')}
              </p>
              <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto lg:mx-0">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero/hero-image.png"
                  alt="Elaboración artesanal de jabones MEM"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary-300 rounded-full opacity-30 blur-3xl" />
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
