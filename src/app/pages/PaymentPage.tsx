import { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Upload, FileCheck, QrCode } from 'lucide-react';
import { toast } from 'sonner';

export function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { orders, confirmPayment } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FFF8F0]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-[#6B5F5F] mb-4">Order not found.</p>
          <Link to="/my-orders" className="text-[#C76B83] hover:text-[#EFA3B7]">Back to My Orders</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file.');
      return;
    }
    setUploadedFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      toast.error('Please upload your payment confirmation PDF before submitting.');
      return;
    }
    setSubmitting(true);
    confirmPayment(order.id);
    setTimeout(() => {
      navigate(`/order-success/${order.id}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/checkout" className="inline-flex items-center text-[#6B5F5F] hover:text-[#C76B83] mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Checkout
        </Link>

        <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-2">Payment</h1>
        <p className="text-[#6B5F5F] mb-8">Complete your payment and upload proof to confirm your order.</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: QR + Upload */}
          <div className="space-y-6">
            {/* Mock QR Code */}
            <div className="bg-white rounded-2xl border border-[#E8D8C8] p-8 text-center">
              <h2 className="text-xl text-[#3B2F2F] mb-2">Scan to Pay</h2>
              <p className="text-sm text-[#6B5F5F] mb-6">
                Scan the QR code below using your e-wallet or banking app to make payment.
              </p>
              <div className="inline-flex flex-col items-center justify-center w-52 h-52 border-2 border-dashed border-[#EFA3B7] rounded-2xl bg-[#FFF8F0] mx-auto mb-4 gap-3">
                <QrCode className="w-16 h-16 text-[#C76B83]" />
                <p className="text-xs text-[#6B5F5F] text-center px-4 leading-snug">
                  Mock QR Code for Online Payment
                </p>
              </div>
              <p className="text-xs text-[#9B8B8B]">
                Amount: <span className="text-[#3B2F2F]">RM {order.total.toFixed(2)}</span>
              </p>
              <p className="text-xs text-[#9B8B8B] mt-1">
                Reference: <span className="text-[#3B2F2F]">{order.id}</span>
              </p>
            </div>

            {/* Upload Proof */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8D8C8] p-8">
              <h2 className="text-xl text-[#3B2F2F] mb-2">Upload Payment Confirmation</h2>
              <p className="text-sm text-[#6B5F5F] mb-6">
                After making payment, upload your payment slip or screenshot as PDF proof.
              </p>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#EFA3B7] rounded-xl p-8 text-center cursor-pointer hover:bg-[#FFF8F0] transition-colors mb-4"
              >
                {uploadedFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileCheck className="w-10 h-10 text-[#8FBF9F]" />
                    <p className="text-[#3B2F2F] text-sm">{uploadedFile.name}</p>
                    <p className="text-xs text-[#6B5F5F]">
                      {(uploadedFile.size / 1024).toFixed(1)} KB — Click to change
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-10 h-10 text-[#EFA3B7]" />
                    <p className="text-[#3B2F2F] text-sm">Upload Payment Confirmation (PDF)</p>
                    <p className="text-xs text-[#6B5F5F]">Click to browse or drag and drop</p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Payment Confirmation'}
              </button>

              <p className="text-xs text-[#9B8B8B] text-center mt-3">
                Payment status will be set to <strong>Pending Verification</strong>. Admin will verify and update your order.
              </p>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-[#E8D8C8] p-6 sticky top-24">
              <h2 className="text-xl text-[#3B2F2F] mb-5">Order Summary</h2>

              <div className="space-y-1 mb-5">
                <div className="flex justify-between text-sm text-[#6B5F5F]">
                  <span>Order ID</span>
                  <span className="text-[#3B2F2F]">{order.id}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6B5F5F]">
                  <span>Payment Method</span>
                  <span className="text-[#3B2F2F]">{order.paymentMethod ?? 'Online Transfer'}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6B5F5F]">
                  <span>Delivery</span>
                  <span className="text-[#3B2F2F]">{order.deliveryOption ?? 'Home Delivery'}</span>
                </div>
              </div>

              <div className="border-t border-[#E8D8C8] pt-4 mb-5 space-y-2">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-[#6B5F5F]">{item.product.name} × {item.quantity}</span>
                    <span className="text-[#3B2F2F]">RM {(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E8D8C8] pt-4 space-y-2">
                <div className="flex justify-between text-[#6B5F5F]">
                  <span>Subtotal</span>
                  <span>RM {order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6B5F5F]">
                  <span>Shipping</span>
                  <span className="text-[#8FBF9F]">Free</span>
                </div>
                <div className="flex justify-between text-xl text-[#3B2F2F] pt-1">
                  <span>Total</span>
                  <span>RM {order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#FFF8F0] rounded-lg border border-[#E8D8C8]">
                <p className="text-xs text-[#6B5F5F] leading-relaxed">
                  <span className="text-[#E8A87C]">ℹ️</span>{' '}
                  After submitting, your payment will be reviewed by our admin team. You will be notified once payment is verified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
