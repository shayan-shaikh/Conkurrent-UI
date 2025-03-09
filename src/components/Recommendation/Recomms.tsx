
// import { useState } from 'react';
// import RecommendationCard from './RecommCard';

const RecommendationSection = () => {
  // Sample topic recommendations data
  // const topics = [
  //   {
  //     id: 1,
  //     title: "Artificial Intelligence Ethics",
  //     votes: 128,
  //     category: "Technology",
  //     description: "Exploring the ethical implications and guidelines for responsible AI development."
  //   },
  //   {
  //     id: 2,
  //     title: "Web3 and the Decentralized Internet",
  //     votes: 96,
  //     category: "Technology",
  //     description: "How blockchain and decentralized technologies are reshaping the future of the web."
  //   },
  //   {
  //     id: 3,
  //     title: "Climate Tech Innovations",
  //     votes: 84,
  //     category: "Environment",
  //     description: "Technological solutions addressing climate change and environmental challenges."
  //   },
  //   {
  //     id: 4,
  //     title: "Future of Work in the Digital Age",
  //     votes: 72,
  //     category: "Society",
  //     description: "How remote work, automation, and new technologies are transforming the workplace."
  //   },
  //   {
  //     id: 5,
  //     title: "Digital Privacy in a Connected World",
  //     votes: 65,
  //     category: "Society",
  //     description: "Navigating privacy concerns in an era of increasing digital surveillance and data collection."
  //   },
  //   {
  //     id: 6,
  //     title: "Biotechnology Breakthroughs",
  //     votes: 59,
  //     category: "Science",
  //     description: "Exploring recent advances in biotech and their potential impact on medicine and society."
  //   }
  // ];

  // const [activeCategory, setActiveCategory] = useState('All');
  // const categories = ['All', 'Technology', 'Environment', 'Society', 'Science'];
  
  // const filteredTopics = activeCategory === 'All' 
  //   ? topics 
  //   : topics.filter(topic => topic.category === activeCategory);

  return (
    <section id="recommendations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Topics for upcoming episodes</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Vote on topics you'd like us to cover in future episodes or suggest your own ideas.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map(topic => (
            <RecommendationCard key={topic.id} topic={topic} />
          ))}
        </div> */}
        
        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Suggest a Topic</h3>
          <p className="text-gray-600 mb-6">
            Have an idea for a future episode? We'd love to hear it! Submit your suggestion below.
          </p>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                Topic Title
              </label>
              <input
                type="text"
                id="topic"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your topic idea"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Environment">Environment</option>
                <option value="Society">Society</option>
                <option value="Science">Science</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Briefly describe this topic and why it would be interesting"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md"
            >
              Submit Topic
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;