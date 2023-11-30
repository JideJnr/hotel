import { CircularProgress } from '@mui/material';
import React from 'react';

const Button = ({ onClick, label, color, loading }) => {
  return (
    <button
      className={`cursor-pointer px-6 h-10 text-white bg-gray-500 rounded text-xs hover:text-blue-500 duration-500 w-full ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={loading}
    >
      <div className='flex mx-2'>
        {loading && <CircularProgress />}
      </div>
      {label}
    </button>
  );
};

export default Button;
