import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          to="/"
          className="inline-flex items-center text-[#6B5F5F] hover:text-[#C76B83] mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl p-12 border border-[#E8D8C8] text-center">
          <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-4">
            {title}
          </h1>
          <p className="text-lg text-[#6B5F5F] mb-8">{description}</p>
          <p className="text-[#6B5F5F]">This page is coming soon.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
