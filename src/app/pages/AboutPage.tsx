import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Heart, Target, Sparkles, Leaf } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-8 text-center">
          About Kraf Hibiscus
        </h1>

        {/* Our Story */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-[#E8D8C8]">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#EFA3B7] rounded-full">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">
              Our Story
            </h2>
          </div>
          <p className="text-[#6B5F5F] leading-relaxed mb-4">
            Kraf Hibiscus was born from a simple yet powerful idea: transforming discarded fabrics into beautiful, handmade products that bring joy to people's lives while protecting our planet. Founded in 2023, our community-based initiative started with a small group of passionate crafters who saw potential in what others considered waste.
          </p>
          <p className="text-[#6B5F5F] leading-relaxed">
            Today, we've grown into a thriving community of artisans, environmentalists, and conscious consumers who believe that sustainability and style can go hand in hand. Each product we create tells a story of transformation, creativity, and hope for a greener future.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-[#E8D8C8]">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#C76B83] rounded-full">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">
              Our Mission
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-2 h-2 bg-[#EFA3B7] rounded-full mt-2"></div>
              <p className="text-[#6B5F5F] leading-relaxed">
                <strong className="text-[#3B2F2F]">Environmental Impact:</strong> Reduce textile waste by giving new life to recycled fabrics and promoting sustainable consumption patterns.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-2 h-2 bg-[#EFA3B7] rounded-full mt-2"></div>
              <p className="text-[#6B5F5F] leading-relaxed">
                <strong className="text-[#3B2F2F]">Community Empowerment:</strong> Create meaningful employment opportunities for local artisans and foster a sense of community through shared creative endeavors.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-2 h-2 bg-[#EFA3B7] rounded-full mt-2"></div>
              <p className="text-[#6B5F5F] leading-relaxed">
                <strong className="text-[#3B2F2F]">Quality Craftsmanship:</strong> Deliver beautifully crafted, unique products that celebrate traditional handmaking techniques with contemporary design.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-2 h-2 bg-[#EFA3B7] rounded-full mt-2"></div>
              <p className="text-[#6B5F5F] leading-relaxed">
                <strong className="text-[#3B2F2F]">Education & Awareness:</strong> Raise awareness about sustainable fashion and inspire others to make environmentally conscious choices.
              </p>
            </div>
          </div>
        </div>

        {/* Handmade Product Focus */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-[#E8D8C8]">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E8A87C] rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">
              Handmade with Love
            </h2>
          </div>
          <p className="text-[#6B5F5F] leading-relaxed mb-6">
            Every Kraf Hibiscus product is meticulously handcrafted by skilled artisans in our community workshop. We take pride in the human touch that goes into each item, ensuring that no two pieces are exactly alike. Our product range includes:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#FFF8F0] rounded-lg p-6 border border-[#E8D8C8]">
              <div className="text-4xl mb-3">🎀</div>
              <h3 className="text-lg text-[#3B2F2F] mb-2">Scrunchies</h3>
              <p className="text-sm text-[#6B5F5F]">
                Soft, gentle hair accessories in vibrant patterns and colors, perfect for everyday wear without damaging your hair.
              </p>
            </div>
            <div className="bg-[#FFF8F0] rounded-lg p-6 border border-[#E8D8C8]">
              <div className="text-4xl mb-3">👜</div>
              <h3 className="text-lg text-[#3B2F2F] mb-2">Bags</h3>
              <p className="text-sm text-[#6B5F5F]">
                Durable and stylish tote bags, shoulder bags, and crossbody bags designed for daily use and weekend adventures.
              </p>
            </div>
            <div className="bg-[#FFF8F0] rounded-lg p-6 border border-[#E8D8C8]">
              <div className="text-4xl mb-3">👛</div>
              <h3 className="text-lg text-[#3B2F2F] mb-2">Purses</h3>
              <p className="text-sm text-[#6B5F5F]">
                Compact wallets and coin purses featuring clever compartments and secure closures to keep your essentials organized.
              </p>
            </div>
            <div className="bg-[#FFF8F0] rounded-lg p-6 border border-[#E8D8C8]">
              <div className="text-4xl mb-3">🧵</div>
              <h3 className="text-lg text-[#3B2F2F] mb-2">Fabric Crafts</h3>
              <p className="text-sm text-[#6B5F5F]">
                Unique decorative items, keychains, and accessories that add a handmade touch to your home and lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* Sustainability Purpose */}
        <div className="bg-gradient-to-br from-[#8FBF9F] to-[#7AA98A] rounded-2xl p-8 border border-[#E8D8C8]">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full">
              <Leaf className="w-6 h-6 text-[#8FBF9F]" />
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl text-white">
              Committed to Sustainability
            </h2>
          </div>
          <p className="text-white leading-relaxed mb-6">
            Sustainability isn't just a buzzword for us—it's the foundation of everything we do. The fashion industry is one of the largest polluters globally, and textile waste contributes significantly to environmental degradation. At Kraf Hibiscus, we're doing our part to combat this crisis.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/90 backdrop-blur rounded-lg p-6">
              <div className="text-3xl mb-3">♻️</div>
              <h3 className="text-lg text-[#3B2F2F] mb-2">Zero Waste</h3>
              <p className="text-sm text-[#6B5F5F]">
                We use 100% recycled fabrics, ensuring that discarded textiles get a second life instead of ending up in landfills.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-lg p-6">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="text-lg text-[#3B2F2F] mb-2">Eco-Friendly</h3>
              <p className="text-sm text-[#6B5F5F]">
                Our production process uses minimal water and energy, and we avoid harmful chemicals and dyes whenever possible.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-lg p-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg text-[#3B2F2F] mb-2">Community-Led</h3>
              <p className="text-sm text-[#6B5F5F]">
                We partner with local communities to collect fabrics and create employment opportunities for marginalized groups.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
