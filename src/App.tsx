import { useState, useEffect } from "react";
import { auth, signInWithGoogle } from "./utils/firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import AuthPage from "./pages/AuthPage";
import "./App.css";
import AboutUs from "./components/AboutUs/AboutUs";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import EpisodeList from "./components/EpisodeList/EpisodeList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Mission from "./components/Mission/Mission";
import TopicSuggestionsComponent from "./components/Recommendation/TopicSuggestion";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <CustomCursor/>

      {user ? (
        <>
          <Header />
          <main>
            <Hero setIsAuth={setIsAuth} />
            <Mission />
            <EpisodeList />
            <TopicSuggestionsComponent />
            <AboutUs />
          </main>
          <Footer />
          <div className="fixed top-4 right-4">
            <button
              onClick={() => signOut(auth)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <AuthPage/>
      )}
    </div>
  );
}

export default App;
