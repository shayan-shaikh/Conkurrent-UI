import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Suggestion } from '../../types/types';
import { apiUrl } from '../../constants/constants';
import SuggestionForm from './SuggestionForm';
import SuggestionsModal from './SuggestionsModal';
import PodcastModel from './PodcastModel';

const TopicSuggestionsComponent: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/suggestions`);
      if (Array.isArray(response.data)) {
        setSuggestions(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <section id='recommendations' className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Podcast Topic Suggestions
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left side: Form */}
          <SuggestionForm 
            openModal={() => setIsModalOpen(true)}
            refreshSuggestions={fetchSuggestions}
          />
          
          {/* Right side: 3D Podcast Model */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Podcast</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Your suggestions help shape our content. Every idea counts!
            </p>
            <div className="w-64 h-64">
              <PodcastModel />
            </div>
          </div>
        </div>
      </div>
      
      <SuggestionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        suggestions={suggestions}
        refreshSuggestions={fetchSuggestions}
      />
    </section>
  );
};

export default TopicSuggestionsComponent;