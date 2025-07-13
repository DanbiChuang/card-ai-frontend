import React from 'react';

export default function Card({ 
  children, 
  className = "",
  padding = 'p-6',
  shadow = 'shadow-md',
  rounded = 'rounded-lg',
  background = 'bg-white'
}) {
  return (
    <div className={`${background} ${rounded} ${shadow} ${padding} ${className}`}>
      {children}
    </div>
  );
} 