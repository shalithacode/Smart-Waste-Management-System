import React, { useState } from 'react';

const InputField = ({ label, type = 'text', value, onChange, placeholder, name, className }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={isPasswordVisible && type === 'password' ? 'text' : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-2 text-gray-500"
        >
          {isPasswordVisible ? 'Hide' : 'Show'}
        </button>
      )}
    </div>
  );
};

export default InputField;
