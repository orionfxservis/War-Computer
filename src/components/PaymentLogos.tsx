import React from 'react';

interface PaymentLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Official Easypaisa Logo Icon matching easypaisa.jpg
 * Features the signature black upper loop with center cutout and the vibrant emerald green lower smile curve.
 */
export const EasypaisaLogo: React.FC<PaymentLogoProps> = ({ 
  className = "w-4 h-4",
  size
}) => {
  const sizeClass = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : '';

  return (
    <span className={`inline-flex items-center justify-center rounded-[5px] bg-white p-[1.5px] shadow-sm flex-shrink-0 overflow-hidden ${sizeClass} ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
        aria-label="Easypaisa"
      >
        {/* Top Loop of 'e' in bold black */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 14C29.5 14 15 28 15 47C23.5 42.5 35 40 50 40C65 40 76.5 42.5 85 47C85 28 70.5 14 50 14ZM33 36C33 28.5 40.5 24 50 24C59.5 24 67 28.5 67 36C67 40 60 41.5 50 41.5C40 41.5 33 40 33 36Z"
          fill="#111827"
        />
        {/* Bottom Smile Curve of 'e' in authentic Easypaisa Green */}
        <path
          d="M15 51C20.5 72.5 33.5 86 50 86C66.5 86 79.5 72.5 85 51C77 65.5 65 73.5 50 73.5C35 73.5 23 65.5 15 51Z"
          fill="#00A859"
        />
      </svg>
    </span>
  );
};

/**
 * Official JazzCash Logo Icon matching jazzcash.jpg
 * Features the iconic yellow left crescent and red right crescent on a crisp white badge.
 */
export const JazzCashLogo: React.FC<PaymentLogoProps> = ({ 
  className = "w-4 h-4",
  size
}) => {
  const sizeClass = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : '';

  return (
    <span className={`inline-flex items-center justify-center rounded-[5px] bg-white p-[1.5px] shadow-sm flex-shrink-0 overflow-hidden ${sizeClass} ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
        aria-label="JazzCash"
      >
        {/* Left Crescent in Golden Yellow */}
        <path
          d="M48 18C31 23 18 35 18 50C18 65 31 77 48 82C37 72 32 62 32 50C32 38 37 28 48 18Z"
          fill="#FFBF00"
        />
        {/* Right Crescent in Crimson Red */}
        <path
          d="M52 18C69 23 82 35 82 50C82 65 69 77 52 82C63 72 68 62 68 50C68 38 63 28 52 18Z"
          fill="#ED1C24"
        />
      </svg>
    </span>
  );
};
