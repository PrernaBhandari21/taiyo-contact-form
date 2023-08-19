import React from 'react'

const Header = ({ title }) => {
  let headerStyle = 'bg-gray-800 text-center';
  let titleStyle = 'text-gray-300 underline decoration-slate-100 font-semibold';

  if (title === 'Taiyo Assignment') {
    headerStyle = 'bg-blue-500 text-center h-10';
    titleStyle = 'text-white font-bold py-2';
  }

  return (
    <header className={headerStyle}>
      <h1 className={titleStyle}>{title}</h1>
    </header>
  );
};

export default Header