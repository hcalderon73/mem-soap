import ProductPageContent from '@/components/product/ProductPageContent';
import { getProducts, getProductBySlug } from '@/lib/data/products';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// Generate static params for product pages
export function generateStaticParams() {
  const locales = ['es', 'en'];
  const products = getProducts('es'); // Use Spanish products for slugs (they are the same)
  
  return locales.flatMap(locale => 
    products.map(product => ({ 
      slug: product.slug, 
      locale 
    }))
  );
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const product = getProductBySlug(locale, slug);
  
  if (!product) {
    // Return a default product if not found
    return (
      <ProductPageContent 
        product={{
          id: '0',
          name: locale === 'en' ? 'Product not found' : 'Producto no encontrado',
          price: 0,
          image: '/images/products/lavanda.png',
          description: locale === 'en' 
            ? 'The product you are looking for is not available.' 
            : 'El producto que buscas no está disponible.',
          stock: 0,
        }} 
        slug={slug} 
      />
    );
  }
  
  return (
    <ProductPageContent product={product} slug={slug} />
  );
}
