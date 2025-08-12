import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import AuthModal from './AuthModal';

const LandingPage: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center space-x-4">
              <a href="mailto:catzowithao@gmail.com" className="flex items-center text-gray-600 hover:text-orange-600">
                <Mail className="w-4 h-4 mr-1" />
                <span className="hidden sm:block">catzowithao@gmail.com</span>
              </a>
              <a href="tel:8637498818" className="flex items-center text-gray-600 hover:text-orange-600">
                <Phone className="w-4 h-4 mr-1" />
                <span>8637498818</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Logo className="mb-8" showTagline />
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your One-Stop
            <span className="text-orange-500"> Pet Shop</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover everything your furry, feathered, and finned friends need. 
            From premium food to toys, we've got it all!
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto shadow-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400",
              title: "Cats & Kittens",
              description: "Adorable felines looking for loving homes"
            },
            {
              image: "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=400",
              title: "Birds & Supplies",
              description: "Beautiful birds and everything they need"
            },
            {
              image: "https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=400",
              title: "Aquatic Life",
              description: "Fish, aquariums, and marine accessories"
            },
            {
              image: "https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=400",
              title: "Premium Food",
              description: "Nutritious meals for all your pets"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h3>
          <p className="text-xl mb-6 opacity-90">Join thousands of happy pet parents who trust Catzo</p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Create Account
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-gray-400">From Treats to Toys — Catzo Delivers Joy.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2">
                <p className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  8637498818
                </p>
                <p className="flex items-center text-gray-400">
                  <Mail className="w-4 h-4 mr-2" />
                  catzowithao@gmail.com
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Cats & Kittens</li>
                <li>Birds & Supplies</li>
                <li>Fish & Aquariums</li>
                <li>Pet Food & Treats</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Catzo Pet Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          navigate('/dashboard');
        }}
      />
    </div>
  );
};

export default LandingPage;