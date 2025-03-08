

const EpisodeCard = ({ episode }: {episode : any}) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1">
      <div className="relative">
        <img 
          src={episode.image} 
          alt={episode.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {episode.number}
        </div>
        {episode.featured && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">{episode.date}</span>
          <span className="text-gray-400 text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {episode.duration}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold mb-3 text-white leading-tight">{episode.title}</h3>
        
        <p className="text-gray-400 mb-4 line-clamp-2">
          {episode.description}
        </p>
        
        <div className="flex justify-between items-center">
          <button className="flex items-center text-purple-500 hover:text-purple-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Play Episode
          </button>
          
          <button className="text-gray-500 hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;