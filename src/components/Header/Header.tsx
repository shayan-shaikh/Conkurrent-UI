// src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-scroll';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-gray-900 bg-opacity-95 backdrop-blur-sm text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">CK</span>
            <div className='d h-'></div>
          </div>
          <span className="text-xl font-bold gradient-text">ConKurrent</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
        <Link to="home" smooth={true} duration={500} className="py-2 px-2 hover:bg-red-300 rounded-md cursor-pointer">Home</Link>
          <Link to="about" smooth={true} duration={500} className="py-2 px-2 hover:bg-red-300 rounded-md cursor-pointer">About</Link>
          <Link to="episodes" smooth={true} duration={500} className="py-2 px-2 hover:bg-red-300 rounded-md  cursor-pointer">Episodes</Link>
          <Link to="recommendations" smooth={true} duration={500} className="py-2 px-2 hover:bg-red-300 rounded-md cursor-pointer">Topics</Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-2">
        <nav className="flex flex-col text-center">
          <Link to="home" smooth={true} duration={500} className="py-2 hover:bg-gray-700 cursor-pointer">Home</Link>
          <Link to="about" smooth={true} duration={500} className="py-2 hover:bg-gray-700 cursor-pointer">About</Link>
          <Link to="episodes" smooth={true} duration={500} className="py-2 hover:bg-gray-700 cursor-pointer">Episodes</Link>
          <Link to="recommendations" smooth={true} duration={500} className="py-2 hover:bg-gray-700 cursor-pointer">Topics</Link>
        </nav>
      </div>
      )}
    </header>
  );
};

export default Header;