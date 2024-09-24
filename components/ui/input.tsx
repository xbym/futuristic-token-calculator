import React from 'react';

interface InputProps {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, id, name, value, onChange, className, required }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      required={required}
    />
  );
};

export default Input;