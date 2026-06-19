import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Recycle, Droplet, Zap, Users } from 'lucide-react';

export function CommunityRecyclingPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-4 text-center">
          Community Recycling Program
        </h1>
        <p className="text-center text-[#6B5F5F] mb-12 max-w-3xl mx-auto">
          Join us in our mission to transform textile waste into beautiful handmade products.
          Together, we can make a meaningful impact on our environment and community.
        </p>

        {/* Recycling Process Timeline */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F] mb-8 text-center">
            Our Recycling Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#EFA3B7] rounded-full mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-[#EFA3B7] text-white rounded-full mb-3 font-bold">
                  1
                </div>
                <h3 className="text-lg text-[#3B2F2F] mb-2">Collection</h3>
                <p className="text-sm text-[#6B5F5F]">
                  Community members donate unused fabrics, old clothes, and textile scraps at our collection centers.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#E8D8C8] -ml-3"></div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C76B83] rounded-full mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-[#C76B83] text-white rounded-full mb-3 font-bold">
                  2
                </div>
                <h3 className="text-lg text-[#3B2F2F] mb-2">Sorting</h3>
                <p className="text-sm text-[#6B5F5F]">
                  Our team carefully sorts fabrics by type, quality, color, and condition to determine the best use.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#E8D8C8] -ml-3"></div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E8A87C] rounded-full mb-4">
                  <span className="text-2xl">🧼</span>
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-[#E8A87C] text-white rounded-full mb-3 font-bold">
                  3
                </div>
                <h3 className="text-lg text-[#3B2F2F] mb-2">Preparation</h3>
                <p className="text-sm text-[#6B5F5F]">
                  Fabrics are cleaned, sanitized, and cut into usable pieces, ready for our artisans to work with.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#E8D8C8] -ml-3"></div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8FBF9F] rounded-full mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-[#8FBF9F] text-white rounded-full mb-3 font-bold">
                  4
                </div>
                <h3 className="text-lg text-[#3B2F2F] mb-2">Transformation</h3>
                <p className="text-sm text-[#6B5F5F]">
                  Skilled artisans handcraft the recycled fabrics into beautiful scrunchies, bags, purses, and more.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fabric Collection Information */}
        <div className="bg-gradient-to-br from-[#EFA3B7] to-[#C76B83] rounded-2xl p-8 mb-8 border border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-2xl text-white mb-6 text-center">
            How to Donate Fabrics
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/95 backdrop-blur rounded-xl p-6">
              <h3 className="text-lg text-[#3B2F2F] mb-4">Collection Centers</h3>
              <div className="space-y-4">
                {/* Real location */}
                <div className="flex items-start gap-3 p-3 bg-[#FFF0F5] rounded-lg border border-[#EFA3B7]/40">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#C76B83] rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-[#3B2F2F] font-medium">Kabin Kraf Hibiscus</p>
                    <p className="text-sm text-[#6B5F5F]">Jalan PI 4/14, Taman Pulai Indah, 81300 Skudai, Johor, Malaysia</p>
                    <p className="text-sm text-[#6B5F5F]">Mon–Sat: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
                {/* Mock partner centers */}
                <div className="flex items-start gap-3 opacity-70">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#EFA3B7] rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-[#3B2F2F] font-medium">Community Hub Johor Bahru <span className="text-xs text-[#9B8B8B] font-normal">(Partner Collection Point — Mock Data)</span></p>
                    <p className="text-sm text-[#6B5F5F]">Tue–Sun: 10:00 AM – 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 opacity-70">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#EFA3B7] rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-[#3B2F2F] font-medium">Skudai Eco Recycling Point <span className="text-xs text-[#9B8B8B] font-normal">(Partner Collection Point — Mock Data)</span></p>
                    <p className="text-sm text-[#6B5F5F]">Mon–Fri: 8:00 AM – 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur rounded-xl p-6">
              <h3 className="text-lg text-[#3B2F2F] mb-4">Donation Guidelines</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#8FBF9F] rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <p className="text-sm text-[#6B5F5F]">
                    Clean and dry fabrics only (we'll sanitize them again, but please ensure basic cleanliness)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#8FBF9F] rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <p className="text-sm text-[#6B5F5F]">
                    Any fabric type: cotton, polyester, silk, denim, canvas, or blends
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#8FBF9F] rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <p className="text-sm text-[#6B5F5F]">
                    Old clothing, bed sheets, curtains, tablecloths, or fabric scraps all welcome
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#8FBF9F] rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <p className="text-sm text-[#6B5F5F]">
                    Minimum size: pieces at least 15cm x 15cm work best for our products
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#C94C4C] rounded-full flex items-center justify-center text-white text-xs">
                    ✗
                  </div>
                  <p className="text-sm text-[#6B5F5F]">
                    Please no heavily stained, moldy, or contaminated fabrics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Materials We Collect */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F] mb-6 text-center">
            Materials We Collect
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#FFF8F0] rounded-lg p-4 text-center border border-[#E8D8C8]">
              <div className="text-3xl mb-2">👕</div>
              <p className="text-sm text-[#3B2F2F]">Old T-Shirts & Clothing</p>
            </div>
            <div className="bg-[#FFF8F0] rounded-lg p-4 text-center border border-[#E8D8C8]">
              <div className="text-3xl mb-2">🛏️</div>
              <p className="text-sm text-[#3B2F2F]">Bed Sheets & Linens</p>
            </div>
            <div className="bg-[#FFF8F0] rounded-lg p-4 text-center border border-[#E8D8C8]">
              <div className="text-3xl mb-2">🪟</div>
              <p className="text-sm text-[#3B2F2F]">Curtains & Drapes</p>
            </div>
            <div className="bg-[#FFF8F0] rounded-lg p-4 text-center border border-[#E8D8C8]">
              <div className="text-3xl mb-2">👖</div>
              <p className="text-sm text-[#3B2F2F]">Jeans & Denim</p>
            </div>
            <div className="bg-[#FFF8F0] rounded-lg p-4 text-center border border-[#E8D8C8]">
              <div className="text-3xl mb-2">🧣</div>
              <p className="text-sm text-[#3B2F2F]">Scarves & Accessories</p>
            </div>
            <div className="bg-[#FFF8F0] rounded-lg p-4 text-center border border-[#E8D8C8]">
              <div className="text-3xl mb-2">🎨</div>
              <p className="text-sm text-[#3B2F2F]">Fabric Remnants</p>
            </div>
            <div className="bg-[#FFF8F0] rounded-lg p-4 text-center border border-[#E8D8C8]">
              <div className="text-3xl mb-2">🧶</div>
              <p className="text-sm text-[#3B2F2F]">Canvas & Heavy Fabrics</p>
            </div>
            <div className="bg-[#FFF8F0] rounded-lg p-4 text-center border border-[#E8D8C8]">
              <div className="text-3xl mb-2">✨</div>
              <p className="text-sm text-[#3B2F2F]">And Much More!</p>
            </div>
          </div>
        </div>

        {/* Sustainability Impact */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-[#E8D8C8] text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#8FBF9F] rounded-full mb-4">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl text-[#3B2F2F] mb-2">2,500+ kg</p>
            <p className="text-sm text-[#6B5F5F]">Fabrics Recycled</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#E8D8C8] text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E8A87C] rounded-full mb-4">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl text-[#3B2F2F] mb-2">180,000 L</p>
            <p className="text-sm text-[#6B5F5F]">Water Saved</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#E8D8C8] text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#EFA3B7] rounded-full mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl text-[#3B2F2F] mb-2">3,200 kWh</p>
            <p className="text-sm text-[#6B5F5F]">Energy Conserved</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#E8D8C8] text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#C76B83] rounded-full mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl text-[#3B2F2F] mb-2">450+</p>
            <p className="text-sm text-[#6B5F5F]">Active Contributors</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
