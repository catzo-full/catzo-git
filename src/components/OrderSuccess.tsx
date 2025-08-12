import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Mail, Phone } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600">Thank you for shopping with Catzo</p>
          </div>

          {orderId && (
            <div className="bg-orange-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="font-mono text-lg font-semibold text-orange-600">{orderId}</p>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-3 text-orange-500" />
              <span>Order confirmation sent to your email</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Package className="w-4 h-4 mr-3 text-orange-500" />
              <span>We'll notify you when your order ships</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-3 text-orange-500" />
              <span>Need help? Call us at 8637498818</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/orders')}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;