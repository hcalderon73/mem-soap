"use client";

import { Leaf, Heart, Users } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/useTranslations';

export default function AboutPage() {
  const t = useTranslations('about');

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

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="aspect-video bg-cream-200 rounded-2xl mb-12 flex items-center justify-center">
              <span className="text-stone-400">Imagen de la historia</span>
            </div>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-stone-800 text-center mb-12">
            {t('values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                <Leaf className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                {t('values.quality')}
              </h3>
              <p className="text-stone-600">
                Seleccionamos los mejores ingredientes naturales para cada jabón.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                {t('values.sustainability')}
              </h3>
              <p className="text-stone-600">
                Comprometidos con prácticas sostenibles y respetuosas con el medio ambiente.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                {t('values.community')}
              </h3>
              <p className="text-stone-600">
                Construimos relaciones duraderas con nuestros clientes y proveedores.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
