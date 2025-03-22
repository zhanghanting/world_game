import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function Spinner({ 
  size = 'md', 
  color = 'text-blue-500', 
  className = '' 
}: SpinnerProps) {
  const sizeClass = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div 
      className={`inline-block animate-spin rounded-full border-solid border-current
      border-r-transparent align-[-0.125em] ${sizeClass[size]} ${color} ${className}`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        正在加载...
      </span>
    </div>
  );
} 