import esProducts from '@/data/products-es.json';
import enProducts from '@/data/products-en.json';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  category: string;
  ingredients: string[];
  weight: string;
}

export function getProducts(locale: string): Product[] {
  switch (locale) {
    case 'en':
      return enProducts.products;
    case 'es':
    default:
      return esProducts.products;
  }
}

export function getProductBySlug(locale: string, slug: string): Product | undefined {
  const products = getProducts(locale);
  return products.find(p => p.slug === slug);
}
