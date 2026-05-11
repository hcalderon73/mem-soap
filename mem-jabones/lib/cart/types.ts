export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug: string;
  stock: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  canAddToCart: (productId: string, quantity: number) => boolean;
  getAvailableStock: (productId: string) => number;
}
