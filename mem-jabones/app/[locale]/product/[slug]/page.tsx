import ProductPageContent from '@/components/product/ProductPageContent';
import productsData from '@/data/products.json';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// Generate static params for product pages
export function generateStaticParams() {
  const locales = ['es', 'en'];
  
  return locales.flatMap(locale => 
    productsData.products.map(product => ({ 
      slug: product.slug, 
      locale 
    }))
  );
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productsData.products.find(p => p.slug === slug);
  
  if (!product) {
    // Return a default product if not found
    return (
      <ProductPageContent 
        product={{
          id: '0',
          name: 'Producto no encontrado',
          price: 0,
          image: '/images/products/lavanda.png',
          description: 'El producto que buscas no está disponible.',
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
