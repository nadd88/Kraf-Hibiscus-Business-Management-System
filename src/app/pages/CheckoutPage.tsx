import { Link, useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal, placeOrder } = useCart();
  const { customer } = useAuth();

  const [formData, setFormData] = useState({
    fullName: customer?.fullName ?? '',
    email: customer?.email ?? '',
    phone: customer?.phone ?? '',
    address: customer?.address ?? '',
  });

  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState('Online Transfer');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8F0]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <p className="text-[#6B5F5F] mb-4">Your cart is empty. Add items before checkout.</p>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = placeOrder(formData, deliveryOption, paymentMethod);
    navigate(`/payment/${orderId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/cart" className="inline-flex items-center text-[#6B5F5F] hover:text-[#C76B83] mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>

        <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Customer + Delivery + Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-xl p-6 border border-[#E8D8C8]">
                <h2 className="text-xl text-[#3B2F2F] mb-6">Customer Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#3B2F2F] mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#3B2F2F] mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+60 12-345 6789"
                      className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[#3B2F2F] mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white rounded-xl p-6 border border-[#E8D8C8]">
                <h2 className="text-xl text-[#3B2F2F] mb-6">Delivery Information</h2>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${deliveryOption === 'delivery' ? 'border-[#EFA3B7] bg-[#FFF8F0]' : 'border-[#E8D8C8] hover:bg-[#F5EDE3]'}`}>
                      <input type="radio" name="delivery" value="delivery" checked={deliveryOption === 'delivery'} onChange={() => setDeliveryOption('delivery')} className="mr-3" />
                      <div>
                        <p className="text-[#3B2F2F] font-medium">Home Delivery</p>
                        <p className="text-sm text-[#6B5F5F]">Free shipping within Malaysia</p>
                      </div>
                    </label>
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${deliveryOption === 'pickup' ? 'border-[#EFA3B7] bg-[#FFF8F0]' : 'border-[#E8D8C8] hover:bg-[#F5EDE3]'}`}>
                      <input type="radio" name="delivery" value="pickup" checked={deliveryOption === 'pickup'} onChange={() => setDeliveryOption('pickup')} className="mr-3" />
                      <div>
                        <p className="text-[#3B2F2F] font-medium">Self Pickup</p>
                        <p className="text-sm text-[#6B5F5F]">Collect from our store</p>
                      </div>
                    </label>
                  </div>

                  {deliveryOption === 'delivery' && (
                    <div className="pt-2">
                      <label className="block text-sm text-[#3B2F2F] mb-2">Delivery Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Enter your complete delivery address"
                        className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                      />
                    </div>
                  )}

                  {deliveryOption === 'pickup' && (
                    <div className="bg-[#FFF8F0] rounded-lg p-4 border border-[#E8D8C8]">
                      <p className="text-sm text-[#3B2F2F] font-medium mb-2">Pickup Location:</p>
                      <p className="text-sm text-[#6B5F5F]">
                        Kabin Kraf Hibiscus<br />
                        Jalan PI 4/14, Taman Pulai Indah<br />
                        81300 Skudai, Johor, Malaysia
                      </p>
                      <p className="text-sm text-[#6B5F5F] mt-3">
                        Operating Hours: Monday – Saturday, 9:00 AM – 6:00 PM
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 border border-[#E8D8C8]">
                <h2 className="text-xl text-[#3B2F2F] mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {['Online Transfer', 'E-wallet', 'Cash on Pickup'].map((method) => (
                    <label key={method} className="flex items-center p-4 border border-[#E8D8C8] rounded-lg cursor-pointer hover:bg-[#F5EDE3] transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-[#3B2F2F]">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 border border-[#E8D8C8] sticky top-24">
                <h2 className="text-xl text-[#3B2F2F] mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-[#6B5F5F]">{item.product.name} × {item.quantity}</span>
                      <span className="text-[#3B2F2F]">RM {(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E8D8C8] pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-[#6B5F5F]">
                    <span>Subtotal</span>
                    <span>RM {getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B5F5F]">
                    <span>Shipping</span>
                    <span className="text-[#8FBF9F]">Free</span>
                  </div>
                  <div className="flex justify-between text-xl text-[#3B2F2F]">
                    <span>Total</span>
                    <span>RM {getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
