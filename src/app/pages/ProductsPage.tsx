import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/products';
import { toast } from 'sonner';

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [priceRange, setPriceRange] = useState<'all' | 'under30' | '30to50' | 'over50'>('all');
  const [sortBy, setSortBy] = useState('latest');
  const { addToCart } = useCart();

  const categories = ['All', 'Scrunchies', 'Bags', 'Purses', 'Fabric Crafts'];

  const filteredProducts = useMemo(() => {
    let products = mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice =
        priceRange === 'all' ||
        (priceRange === 'under30' && product.price < 30) ||
        (priceRange === '30to50' && product.price >= 30 && product.price <= 50) ||
        (priceRange === 'over50' && product.price > 50);

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    if (sortBy === 'price-low') {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      products = [...products].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-az') {
      products = [...products].sort((a, b) => a.name.localeCompare(b.name));
    }

    return products;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addToCart(product, 1);
    toast.success('Item added to cart.');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-8">
          Shop Handmade Products
        </h1>

        {/* Product Count and Sort */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-[#6B5F5F]">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#6B5F5F]">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] bg-white"
            >
              <option value="latest">Latest</option>
              <option value="name-az">Name: A–Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-[#E8D8C8]">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B5F5F]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm text-[#3B2F2F] mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedCategory === category
                        ? 'bg-[#EFA3B7] text-white'
                        : 'bg-[#F5EDE3] text-[#3B2F2F] hover:bg-[#E8D8C8]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm text-[#3B2F2F] mb-2">Price Range</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPriceRange('all')}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    priceRange === 'all'
                      ? 'bg-[#EFA3B7] text-white'
                      : 'bg-[#F5EDE3] text-[#3B2F2F] hover:bg-[#E8D8C8]'
                  }`}
                >
                  All Prices
                </button>
                <button
                  onClick={() => setPriceRange('under30')}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    priceRange === 'under30'
                      ? 'bg-[#EFA3B7] text-white'
                      : 'bg-[#F5EDE3] text-[#3B2F2F] hover:bg-[#E8D8C8]'
                  }`}
                >
                  Under RM30
                </button>
                <button
                  onClick={() => setPriceRange('30to50')}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    priceRange === '30to50'
                      ? 'bg-[#EFA3B7] text-white'
                      : 'bg-[#F5EDE3] text-[#3B2F2F] hover:bg-[#E8D8C8]'
                  }`}
                >
                  RM30 - RM50
                </button>
                <button
                  onClick={() => setPriceRange('over50')}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    priceRange === 'over50'
                      ? 'bg-[#EFA3B7] text-white'
                      : 'bg-[#F5EDE3] text-[#3B2F2F] hover:bg-[#E8D8C8]'
                  }`}
                >
                  Over RM50
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden border border-[#E8D8C8] hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-br from-[#F5EDE3] to-[#FFF8F0] h-48 flex items-center justify-center border-b border-[#E8D8C8] relative">
                <span className="text-6xl">{product.image}</span>
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs text-[#6B5F5F]">
                  New
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-[#C76B83] mb-1">{product.category}</p>
                <h3 className="text-lg text-[#3B2F2F] mb-2">{product.name}</h3>
                <p className="text-2xl text-[#3B2F2F] mb-2">RM {product.price.toFixed(2)}</p>
                <p className="text-sm text-[#6B5F5F] mb-4">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="flex-1 px-4 py-2 border border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors text-center"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="w-10 h-10 flex items-center justify-center bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xl leading-none"
                    title="Add to cart"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6B5F5F] text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
