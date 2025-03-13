
import { signOut } from "firebase/auth";
import { auth } from "./utils/firebaseConfig";
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
import { useAuth } from "./hooks/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const { user } = useAuth(); // Now user is globally available

  return (
    <div className="min-h-screen bg-gray-100">
       <ToastContainer position="top-right" autoClose={3000} />
      <CustomCursor/>

      {user ? (
        <>
          <Header />
          <main>
            <Hero />
            <Mission />
            <EpisodeList />
            <TopicSuggestionsComponent />
            <AboutUs />
          </main>
          <Footer />
          <div className="fixed top-4 right-4">
            <button
              onClick={() => {
                signOut(auth);
                toast.success("Signed out successfully!");
              }}
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
