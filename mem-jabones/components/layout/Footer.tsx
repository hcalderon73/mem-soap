'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n/useTranslations';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');

  return (
    <footer className="bg-stone-900 text-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}/`} className="inline-block">
              <span 
                className="text-3xl font-bold text-primary-400"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                MEM
              </span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed">
              {t('description')}
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                className="text-stone-400 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-stone-400 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('links.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={`/${locale}/products/`}
                  className="text-stone-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t('links.shop')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/about/`}
                  className="text-stone-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/contact/`}
                  className="text-stone-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('links.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-stone-400 text-sm">
                <Mail className="h-4 w-4 text-primary-400" />
                <span>hola@mem-jabones.com</span>
              </li>
              <li className="flex items-center space-x-3 text-stone-400 text-sm">
                <Phone className="h-4 w-4 text-primary-400" />
                <span>+34 123 456 789</span>
              </li>
              <li className="flex items-start space-x-3 text-stone-400 text-sm">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5" />
                <span>España</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Mini */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('social.title')}</h3>
            <p className="text-stone-400 text-sm mb-4">
              {t('social.description')}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-800 mt-12 pt-8 text-center">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} MEM Jabones. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
