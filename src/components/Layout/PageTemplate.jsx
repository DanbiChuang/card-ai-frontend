import React from 'react';

export default function PageTemplate({ 
  children, 
  title, 
  subtitle, 
  className = "",
  containerClassName = "",
  showBackground = true 
}) {
  return (
    <div className={`min-h-screen ${showBackground ? 'bg-gray-50' : ''} py-8 ${className}`}>
      <div className={`max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="text-center mb-6">
            {title && (
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
            )}
            {subtitle && (
              <p className="text-gray-600">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
} 