import React from 'react';

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-6 h-6" 
    {...props}
  >
    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.463-.949a.75.75 0 01.981.654A10.503 10.503 0 0112 21.75 10.5 10.5 0 011.5 11.25a10.503 10.503 0 018.028-9.532z" clipRule="evenodd" />
  </svg>
);

export default MoonIcon;
