import shayanImg from '../assets/shayan.jpg';
import faizalImg from '../assets/faizal.jpg';
import aribImg from '../assets/arib.jpg';

export const headerOptions = {
    'Mission' : '',
    'Vision' : '',
    'All Episodes' : '',
    'Recommendations' : ''
}

export const mission1 = 'At ConKurrent, our mission is to spark meaningful conversations that bridge the gap between our professional selves and our personal selves.'

export const mission2 = 'We aim to be at the forefront for bringing out conversations and topics that would otherwise stay hidden within ourselves. This initiative succeeds when YOU open up!'

export const vision1 = 'Why just cappucino when you can have a session of yappacino!'

export const vision2 = 'We envision a space where we build a platform to not only bring us closer on an intellectual level but also on a personal level'

export const allEpisodes = [
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

export const teamMembers = [
  { name: "Faizal Shaikh", role: "Generational Enthusiast😎", image: faizalImg },
  { name: "Shayan Shaikh", role: "Professional Yapper🗣️", image: shayanImg },
  { name: "Arib Raje", role: "The Silent Patient🤫", image: aribImg }
];