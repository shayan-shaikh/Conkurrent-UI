import { useState } from 'react';
import EpisodeCard from './EpisodeCard';

const EpisodeList = () => {
  // Sample episode data - this would typically come from an API
  const allEpisodes = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence",
      number: "EP 01",
      date: "March 5, 2025",
      duration: "48 min",
      description: "We explore the cutting-edge developments in AI and what they mean for society, work, and human creativity.",
      image: "/api/placeholder/500/500",
      featured: true
    },
    {
      id: 2,
      title: "Blockchain Beyond Cryptocurrency",
      number: "EP 02",
      date: "March 12, 2025",
      duration: "52 min",
      description: "Diving into the transformative potential of blockchain technology across various industries and use cases.",
      image: "/api/placeholder/500/500",
      featured: false
    },
    {
      id: 3,
      title: "The Metaverse Revolution",
      number: "EP 03",
      date: "March 19, 2025",
      duration: "45 min",
      description: "Exploring how virtual worlds are reshaping entertainment, work, and social connections.",
      image: "/api/placeholder/500/500",
      featured: false
    },
    {
      id: 4,
      title: "Sustainable Tech: Innovation for Planet Earth",
      number: "EP 04",
      date: "March 26, 2025",
      duration: "56 min",
      description: "Discussing technologies that are helping combat climate change and create a more sustainable future.",
      image: "/api/placeholder/500/500",
      featured: true
    },
    {
      id: 5,
      title: "The Psychology of Digital Minimalism",
      number: "EP 05",
      date: "April 2, 2025",
      duration: "50 min",
      description: "How to maintain mental health and focus in an age of constant digital distraction.",
      image: "/api/placeholder/500/500",
      featured: false
    },
    {
      id: 6,
      title: "Quantum Computing Explained",
      number: "EP 06",
      date: "April 9, 2025",
      duration: "61 min",
      description: "Breaking down the complex world of quantum computing and its revolutionary potential.",
      image: "/api/placeholder/500/500",
      featured: false
    }
  ];
  
  const [filter, setFilter] = useState('all');
  
  // Filter episodes based on current filter state
  const filteredEpisodes = filter === 'featured' 
    ? allEpisodes.filter(episode => episode.featured) 
    : allEpisodes;
  
  return (
    <section id="episodes" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Episodes</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Tune in to our latest conversations exploring the cutting edge of technology, culture, and ideas.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-800 rounded-full p-1">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Episodes
            </button>
            <button 
              onClick={() => setFilter('featured')} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'featured' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Featured
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEpisodes.map(episode => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
        
        {/* <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 border border-purple-500 text-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition-colors"
          >
            View All Episodes
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default EpisodeList;