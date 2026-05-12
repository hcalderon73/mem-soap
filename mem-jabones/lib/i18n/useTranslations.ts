'use client';

import { useParams } from 'next/navigation';
import esMessages from '@/lib/i18n/messages/es.json';
import enMessages from '@/lib/i18n/messages/en.json';

const messages = {
  es: esMessages,
  en: enMessages,
};

export function useTranslations(namespace?: string) {
  const params = useParams();
  const locale = (params?.locale as string) || 'es';
  const localeMessages = messages[locale as keyof typeof messages] || messages.es;

  function t(key: string, values?: Record<string, string | number>) {
    const keys = namespace ? `${namespace}.${key}` : key;
    let value = keys.split('.').reduce((obj: any, k) => obj?.[k], localeMessages);
    
    if (!value) return key;
    
    // Simple interpolation for {count} and other variables
    if (values && typeof value === 'string') {
      Object.entries(values).forEach(([k, v]) => {
        value = (value as string).replace(`{${k}}`, String(v));
      });
    }
    
    return value;
  }

  return t;
}

export function useLocale() {
  const params = useParams();
  return (params?.locale as string) || 'es';
}
