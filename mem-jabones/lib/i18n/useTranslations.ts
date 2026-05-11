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

  function t(key: string) {
    const keys = namespace ? `${namespace}.${key}` : key;
    const value = keys.split('.').reduce((obj: any, k) => obj?.[k], localeMessages);
    return value || key;
  }

  return t;
}

export function useLocale() {
  const params = useParams();
  return (params?.locale as string) || 'es';
}
