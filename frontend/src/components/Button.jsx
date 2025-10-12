import React from 'react'; 

const Button = ({ text, onClick, className = '' }) => (
  <button 
    className={`px-4 py-2 bg-[#175E5E] text-white rounded ${className}`} 
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
