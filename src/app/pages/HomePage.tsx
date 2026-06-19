import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Recycle, Scissors, Package, ShoppingBag, Users, Globe } from 'lucide-react';

export function HomePage() {
  const categories = [
    { name: 'Scrunchies', icon: '🎀', color: '#EFA3B7' },
    { name: 'Bags', icon: '👜', color: '#C76B83' },
    { name: 'Purses', icon: '👛', color: '#8FBF9F' },
    { name: 'Fabric Crafts', icon: '✂️', color: '#E8A87C' },
  ];

  const recyclingSteps = [
    {
      step: 1,
      title: 'Collect old clothes and fabric',
      description: 'We gather pre-loved fabrics from the community',
      icon: <Recycle className="w-8 h-8" />,
    },
    {
      step: 2,
      title: 'Sort and prepare materials',
      description: 'Carefully select and prepare quality materials',
      icon: <Scissors className="w-8 h-8" />,
    },
    {
      step: 3,
      title: 'Create handmade products',
      description: 'Transform materials into beautiful handmade items',
      icon: <Package className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm text-[#C76B83] mb-3 tracking-wide uppercase">
              Sustainable Handmade Craft
            </p>
            <h1 className="font-['Playfair_Display'] text-5xl text-[#3B2F2F] mb-6 leading-tight">
              Handmade Products from Recycled Fabrics
            </h1>
            <p className="text-lg text-[#6B5F5F] mb-8">
              Kraf Hibiscus transforms recycled fabrics into handmade items while
              supporting community-based sustainability activities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="px-8 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-full hover:bg-[#C76B83] hover:text-white transition-colors"
              >
                Shop Handmade Products
              </Link>
              <Link
                to="/community"
                className="px-8 py-3 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-full hover:bg-[#EFA3B7] transition-colors"
              >
                Learn About Recycling
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#F5EDE3] to-[#FFF8F0] rounded-2xl p-6 min-h-[400px] relative overflow-hidden border-2 border-[#E8D8C8]">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FDEAF1] flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-6 h-6 text-[#C76B83]" />
                </div>
                <div>
                  <p className="text-sm text-[#3B2F2F] mb-1">Handmade Products</p>
                  <p className="text-[11px] text-[#6B5F5F] leading-snug">Scrunchies, bags, purses, and fabric crafts made from recycled fabrics.</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center flex-shrink-0">
                  <Recycle className="w-6 h-6 text-[#8FBF9F]" />
                </div>
                <div>
                  <p className="text-sm text-[#3B2F2F] mb-1">Recycled Fabric Collection</p>
                  <p className="text-[11px] text-[#6B5F5F] leading-snug">Old fabrics are collected and reused to reduce textile waste.</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FFF3E0] flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#E8A87C]" />
                </div>
                <div>
                  <p className="text-sm text-[#3B2F2F] mb-1">Community Craft Work</p>
                  <p className="text-[11px] text-[#6B5F5F] leading-snug">Supports local handmade craft activities and community participation.</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FDEAF1] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-[#C76B83]" />
                </div>
                <div>
                  <p className="text-sm text-[#3B2F2F] mb-1">Order Online</p>
                  <p className="text-[11px] text-[#6B5F5F] leading-snug">Browse products, add items to cart, and place orders online easily.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-4">
              About Kraf Hibiscus
            </h2>
            <p className="text-lg text-[#6B5F5F] max-w-3xl mx-auto">
              We are a community-based handmade craft business that collects recycled
              fabrics and turns them into beautiful handmade products such as scrunchies,
              bags, purses, and fabric crafts. Every purchase supports sustainability and
              local craftsmanship.
            </p>
          </div>

          {/* Highlight Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-[#FFF8F0] rounded-xl p-8 border border-[#E8D8C8] text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#EFA3B7] rounded-full mb-4">
                <span className="text-3xl">♻️</span>
              </div>
              <h3 className="text-xl text-[#3B2F2F] mb-3">Recycled Fabric Collection</h3>
              <p className="text-[#6B5F5F]">
                We collect pre-loved fabrics from the community, giving them a second life
                and reducing textile waste.
              </p>
            </div>

            <div className="bg-[#FFF8F0] rounded-xl p-8 border border-[#E8D8C8] text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C76B83] rounded-full mb-4">
                <span className="text-3xl">✂️</span>
              </div>
              <h3 className="text-xl text-[#3B2F2F] mb-3">Handmade Product Creation</h3>
              <p className="text-[#6B5F5F]">
                Each product is carefully handcrafted with attention to detail, ensuring
                quality and uniqueness.
              </p>
            </div>

            <div className="bg-[#FFF8F0] rounded-xl p-8 border border-[#E8D8C8] text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8FBF9F] rounded-full mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl text-[#3B2F2F] mb-3">Community Sustainability Support</h3>
              <p className="text-[#6B5F5F]">
                We support local communities through sustainable practices and promote
                environmental awareness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] text-center mb-12">
          Product Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow border border-[#E8D8C8]"
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-xl text-[#3B2F2F] mb-2">{category.name}</h3>
              <p className="text-[#6B5F5F] text-sm">Explore Collection</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Community Recycling */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] text-center mb-12">
            Community Recycling Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {recyclingSteps.map((step) => (
              <div
                key={step.step}
                className="bg-[#FFF8F0] rounded-xl p-8 text-center border border-[#E8D8C8]"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#EFA3B7] rounded-full text-white mb-4">
                  {step.icon}
                </div>
                <div className="text-sm text-[#C76B83] mb-2">Step {step.step}</div>
                <h3 className="text-xl text-[#3B2F2F] mb-2">{step.title}</h3>
                <p className="text-[#6B5F5F]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
