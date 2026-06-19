import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your message has been sent successfully.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-center text-[#6B5F5F] mb-12 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you! Send us a message
          and we'll respond as soon as possible.
        </p>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 border border-[#E8D8C8]">
              <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F] mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#3B2F2F] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#3B2F2F] mb-2">
                      Email Address *
                    </label>
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

                  <div>
                    <label className="block text-sm text-[#3B2F2F] mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E8D8C8]">
              <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F] mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#EFA3B7] rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5F5F] mb-1">Email</p>
                    <p className="text-[#3B2F2F]">krafhibiscus@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#C76B83] rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5F5F] mb-1">Phone</p>
                    <p className="text-[#3B2F2F]">+60 13-754 8950 <span className="text-xs text-[#9B8B8B]">(Puan Fhairna)</span></p>
                    <p className="text-[#3B2F2F]">+60 19-734 3239 <span className="text-xs text-[#9B8B8B]">(Puan Sheila)</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#E8A87C] rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5F5F] mb-1">Address</p>
                    <p className="text-[#3B2F2F]">Kabin Kraf Hibiscus, Jalan PI 4/14, Taman Pulai Indah, 81300 Skudai, Johor, Malaysia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#8FBF9F] rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5F5F] mb-1">Operating Hours</p>
                    <p className="text-[#3B2F2F]">
                      Monday – Saturday<br />
                      9:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#EFA3B7] to-[#C76B83] rounded-2xl p-6 border border-[#E8D8C8]">
              <h3 className="text-lg text-white mb-3">Visit Our Store</h3>
              <p className="text-white/90 text-sm mb-4">
                Come see our handmade products in person! Our friendly team is ready to help you find the perfect sustainable craft item.
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-white text-[#C76B83] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
