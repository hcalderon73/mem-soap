'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    
    // Check if it's Spanish (any variant: es, es-ES, es-MX, etc.)
    const isSpanish = browserLang.toLowerCase().startsWith('es');
    
    // Redirect based on language
    const targetLocale = isSpanish ? 'es' : 'en';
    
    // Check if there's a saved preference in localStorage
    const savedLocale = localStorage.getItem('mem-locale');
    const localeToUse = savedLocale || targetLocale;
    
    router.replace(`/${localeToUse}/`);
  }, [router]);

  // Show a loading state while detecting language
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-stone-600">Detecting language...</p>
      </div>
    </div>
  );
}
