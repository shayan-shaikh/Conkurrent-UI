import './App.css'
import AboutUs from './components/AboutUs/AboutUs';
import CustomCursor from './components/CustomCursor/CustomCursor';
import EpisodeList from './components/EpisodeList/EpisodeList';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Mission from './components/Mission/Mission';
import RecommendationSection from './components/Recommendation/Recomms';

function App() {

  return (
    <div className="min-h-screen bg-gray-100">
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Mission />
        <EpisodeList />
        <RecommendationSection />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}

export default App
