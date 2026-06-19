import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/products';
import { toast } from 'sonner';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFF8F0]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-[#6B5F5F]">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success('Item added to cart.');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/products"
          className="inline-flex items-center text-[#6B5F5F] hover:text-[#C76B83] mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-[#F5EDE3] to-[#FFF8F0] rounded-2xl p-12 border-2 border-[#E8D8C8] flex items-center justify-center min-h-[500px] relative">
            <div className="text-center">
              <span className="text-9xl">{product.image}</span>
              <p className="text-sm text-[#6B5F5F] mt-4">Product Image</p>
            </div>
            <div className="absolute top-4 right-4 bg-[#EFA3B7] text-white px-3 py-1 rounded-full text-sm">
              Handmade
            </div>
          </div>

          {/* Product Details */}
          <div>
            <p className="text-sm text-[#C76B83] mb-2">{product.category}</p>
            <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-4">
              {product.name}
            </h1>
            <p className="text-3xl text-[#3B2F2F] mb-6">RM {product.price.toFixed(2)}</p>

            <div className="mb-6">
              <p className="text-[#6B5F5F] leading-relaxed">{product.description}</p>
            </div>

            {/* Product Information */}
            <div className="mb-6 bg-[#FFF8F0] rounded-xl p-6 border border-[#E8D8C8]">
              <h3 className="text-lg text-[#3B2F2F] mb-4">Product Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#6B5F5F] mb-1">Product Code</p>
                  <p className="text-[#3B2F2F]">P{product.id.padStart(3, '0')}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B5F5F] mb-1">Category</p>
                  <p className="text-[#3B2F2F]">{product.category}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B5F5F] mb-1">Material</p>
                  <p className="text-[#3B2F2F]">Recycled Fabric</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B5F5F] mb-1">Availability</p>
                  <p className={product.stock > 0 ? 'text-[#8FBF9F]' : 'text-[#C94C4C]'}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#6B5F5F] mb-1">Care Instruction</p>
                  <p className="text-[#3B2F2F] text-sm">Hand wash with mild detergent. Air dry only. Do not bleach.</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm text-[#3B2F2F] mb-2">Quantity</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-[#E8D8C8] rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-[#F5EDE3] transition-colors"
                  >
                    <Minus className="w-4 h-4 text-[#3B2F2F]" />
                  </button>
                  <span className="px-6 text-[#3B2F2F]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-[#F5EDE3] transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4 text-[#3B2F2F]" />
                  </button>
                </div>
                <p className="text-sm text-[#6B5F5F]">
                  Total: RM {(product.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 px-8 py-3 bg-white border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 px-8 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
