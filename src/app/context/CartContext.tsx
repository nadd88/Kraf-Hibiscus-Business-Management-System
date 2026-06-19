import { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  paymentStatus: 'Paid' | 'Pending' | 'Pending Verification' | 'Failed';
  orderStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Cancellation Requested';
  items: CartItem[];
  customerInfo?: Record<string, string>;
  deliveryOption?: string;
  paymentMethod?: string;
}

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (customerInfo: any, deliveryOption: string, paymentMethod: string) => string;
  confirmPayment: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
  confirmReceived: (orderId: string) => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const placeOrder = (customerInfo: any, deliveryOption: string, paymentMethod: string) => {
    const orderId = `ORD-${Date.now()}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString(),
      total: getCartTotal(),
      paymentStatus: 'Pending',
      orderStatus: 'Processing',
      items: [...cart],
      customerInfo,
      deliveryOption,
      paymentMethod,
    };
    setOrders((prev) => [...prev, newOrder]);
    clearCart();
    return orderId;
  };

  const confirmPayment = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, paymentStatus: 'Pending Verification' as const } : o
      )
    );
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, orderStatus: 'Cancellation Requested' as const } : o
      )
    );
  };

  const confirmReceived = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, orderStatus: 'Delivered' as const } : o
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        confirmPayment,
        cancelOrder,
        confirmReceived,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
