
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-500">
        AI Movie Night
      </h1>
      <p className="text-slate-400 mt-2">Your AI-powered guide to the next great watch.</p>
    </header>
  );
};

export default Header;
