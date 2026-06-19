import { Link, useParams } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function OrderSuccessPage() {
  const { orderId } = useParams();
  const { orders } = useCart();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FFF8F0]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-[#6B5F5F]">Order not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-12 border border-[#E8D8C8] text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#8FBF9F] rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-4">
            Order Placed Successfully!
          </h1>

          <p className="text-lg text-[#6B5F5F] mb-4">
            Thank you for your order. Your payment confirmation has been submitted.
          </p>

          <div className="bg-[#FFF8F0] rounded-lg p-4 border border-[#E8D8C8] mb-8">
            <p className="text-sm text-[#6B5F5F] text-center">
              <span className="text-[#E8A87C]">📋</span> Payment confirmation submitted. Please wait for admin verification.
            </p>
          </div>

          <div className="bg-[#FFF8F0] rounded-xl p-6 mb-8 text-left">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-[#6B5F5F] mb-1">Order ID</p>
                <p className="text-[#3B2F2F]">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-[#6B5F5F] mb-1">Order Date</p>
                <p className="text-[#3B2F2F]">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#6B5F5F] mb-1">Total Amount</p>
                <p className="text-[#3B2F2F]">RM {order.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-[#6B5F5F] mb-1">Payment Status</p>
                <p className={order.paymentStatus === 'Paid' ? 'text-[#8FBF9F]' : 'text-[#E8A87C]'}>
                  {order.paymentStatus}
                </p>
              </div>
            </div>

            <div className="border-t border-[#E8D8C8] pt-4">
              <p className="text-sm text-[#6B5F5F] mb-3">Order Items</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span className="text-[#3B2F2F]">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="text-[#3B2F2F]">
                      RM {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              to="/my-orders"
              className="px-8 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-full hover:bg-[#C76B83] hover:text-white transition-colors"
            >
              View My Orders
            </Link>
            <Link
              to="/products"
              className="px-8 py-3 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-full hover:bg-[#F5EDE3] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
