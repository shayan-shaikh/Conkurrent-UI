import { useState } from 'react';

const RecommendationCard = ({ topic } : {topic : any}) => {
  const [votes, setVotes] = useState(topic.votes);
  const [hasVoted, setHasVoted] = useState(false);
  
  const handleVote = () => {
    if (!hasVoted) {
      setVotes(votes + 1);
      setHasVoted(true);
    } else {
      setVotes(votes - 1);
      setHasVoted(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
            {topic.category}
          </span>
          <button 
            onClick={handleVote}
            className={`flex items-center space-x-1 ${hasVoted ? 'text-purple-600' : 'text-gray-500'} hover:text-purple-700 transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span>{votes}</span>
          </button>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {topic.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500">
              +{Math.floor(votes / 10)}
            </div>
          </div>
          
          <button className="text-sm text-purple-600 hover:text-purple-800 transition-colors">
            Discuss
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;