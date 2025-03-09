import { useEffect, useState } from 'react';
// import EpisodeCard from './EpisodeCard';

const EpisodeList = () => {
  
  const [filter, setFilter] = useState('all');
  const driveId = import.meta.env.VITE_DRIVE_FOLDER_ID as string;
  useEffect(() => {
    console.log('driveId --> ', driveId)
    console.log('env --> ', import.meta.env)
  }, [driveId])
  
  // const filteredEpisodes = filter === 'featured' 
  //   ? allEpisodes.filter(episode => episode.featured) 
  //   : allEpisodes;
  
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
            <a 
              onClick={() => setFilter('all')}
              href={`https://drive.google.com/drive/folders/${driveId}`}
              target='_blank'
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Check out all Episodes
            </a>
            {/* <button 
              onClick={() => setFilter('featured')} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'featured' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Featured
            </button> */}
          </div>
        </div>
        
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEpisodes.map(episode => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div> */}
        
      </div>
    </section>
  );
};

export default EpisodeList;