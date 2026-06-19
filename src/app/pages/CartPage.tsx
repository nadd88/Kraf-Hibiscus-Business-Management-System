import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8F0]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🛒</p>
            <h2 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F] mb-4">
              Your cart is empty
            </h2>
            <p className="text-[#6B5F5F] mb-8">
              Start shopping to add items to your cart
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-full hover:bg-[#C76B83] hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl p-6 border border-[#E8D8C8] flex gap-6"
              >
                <div className="bg-[#F5EDE3] rounded-lg w-32 h-32 flex items-center justify-center flex-shrink-0">
                  <span className="text-5xl">{item.product.image}</span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl text-[#3B2F2F] mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-[#6B5F5F]">{item.product.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#C94C4C] hover:text-[#A03C3C] transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-2xl text-[#3B2F2F] mb-4">
                    RM {item.product.price.toFixed(2)}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-[#E8D8C8] rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-[#F5EDE3] transition-colors"
                      >
                        <Minus className="w-4 h-4 text-[#3B2F2F]" />
                      </button>
                      <span className="px-4 text-[#3B2F2F]">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-[#F5EDE3] transition-colors"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="w-4 h-4 text-[#3B2F2F]" />
                      </button>
                    </div>

                    <p className="text-lg text-[#3B2F2F]">
                      Subtotal: RM {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-[#E8D8C8] sticky top-24">
              <h2 className="text-xl text-[#3B2F2F] mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#6B5F5F]">
                  <span>Subtotal</span>
                  <span>RM {getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6B5F5F]">
                  <span>Shipping</span>
                  <span className="text-[#8FBF9F]">Free</span>
                </div>
                <div className="border-t border-[#E8D8C8] pt-3 flex justify-between text-xl text-[#3B2F2F]">
                  <span>Total</span>
                  <span>RM {getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-center mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block w-full px-6 py-3 border border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
