import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemedButton = ({ 
  children, 
  onClick, 
  href, 
  target, 
  rel, 
  className = "", 
  size = "medium",
  variant = "icon",
  ...props 
}) => {
  const { theme } = useTheme();

  const sizeClasses = {
    small: "w-10 h-10 p-2",
    medium: "w-12 h-12 p-3",
    large: "w-14 h-14 p-4"
  };

  const baseClasses = `
    rounded-full flex items-center justify-center transition-all duration-300 border-2
    ${sizeClasses[size]}
    ${className}
  `;

  const buttonStyle = {
    backgroundColor: theme === 'dark' ? 'white' : 'black',
    borderColor: theme === 'dark' ? 'black' : 'white'
  };

  const iconStyle = {
    color: theme === 'dark' ? 'black' : 'white'
  };

  const ButtonContent = (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={baseClasses}
      style={buttonStyle}
      onClick={onClick}
      {...props}
    >
      {React.Children.map(children, child => 
        React.cloneElement(child, { style: iconStyle })
      )}
    </motion.button>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className="inline-block"
      >
        {ButtonContent}
      </a>
    );
  }

  return ButtonContent;
};

export default ThemedButton;
