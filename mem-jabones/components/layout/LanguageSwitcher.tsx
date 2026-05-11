'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from '@/lib/i18n/useTranslations';

const locales = [
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // Remove current locale from pathname to get the path without locale
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // Save preference to localStorage
    localStorage.setItem('mem-locale', newLocale);
    
    // Navigate to new locale
    const newPathname = `/${newLocale}${pathnameWithoutLocale}`;
    router.push(newPathname);
  };

  return (
    <div className="flex items-center space-x-1">
      <Globe className="h-4 w-4 text-stone-500 mr-1" />
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => handleLocaleChange(loc.code)}
          className={cn(
            'px-2 py-1 text-sm font-medium rounded transition-colors duration-200',
            locale === loc.code
              ? 'bg-primary-100 text-primary-700'
              : 'text-stone-600 hover:text-primary-600 hover:bg-stone-100'
          )}
          aria-label={`Change to ${loc.label}`}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}
