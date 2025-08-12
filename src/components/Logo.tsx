import React from 'react';

const Logo: React.FC<{ className?: string; showTagline?: boolean }> = ({ 
  className = '', 
  showTagline = false 
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Cat Face Logo */}
      <div className="relative mb-2">
        <div className="w-12 h-12 bg-orange-500 rounded-full relative">
          {/* Cat ears */}
          <div className="absolute -top-2 left-2 w-3 h-3 bg-orange-500 rounded-full transform rotate-45"></div>
          <div className="absolute -top-2 right-2 w-3 h-3 bg-orange-500 rounded-full transform rotate-45"></div>
          
          {/* Cat face */}
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            {/* Eyes */}
            <div className="flex space-x-1 mb-1">
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            </div>
            
            {/* Nose */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-0.5 h-0.5 bg-pink-400 rounded-full"></div>
              {/* Mouth */}
              <div className="mt-0.5 w-2 h-0.5 border-b border-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Brand Name */}
      <h1 className="text-3xl font-bold text-orange-600 tracking-wider">Catzo</h1>
      
      {/* Tagline */}
      {showTagline && (
        <p className="text-sm text-gray-600 mt-1 text-center">
          From Treats to Toys — Catzo Delivers Joy.
        </p>
      )}
    </div>
  );
};

export default Logo;