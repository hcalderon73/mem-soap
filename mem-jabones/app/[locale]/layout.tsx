import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartWrapper from '@/components/cart/CartWrapper';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Generate static params for all locales
export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  return (
    <CartWrapper>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </CartWrapper>
  );
}
