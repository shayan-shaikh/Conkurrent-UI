// src/components/Mission.jsx
import React from 'react';
import { mission1, mission2, vision1, vision2 } from '../../constants/constants';

const Mission = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {mission1}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {mission2}
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
             {vision1}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {vision2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;