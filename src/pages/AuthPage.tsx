import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { motion } from "framer-motion";
import googleIcon from '../assets/google.svg'

const AuthPage = () => {
  const [error, setError] = useState(null);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();


  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg backdrop-blur-lg text-white"
      >
        <h3 className="text-2xl font-extrabold text-center">🎙 ConKurrent welcomes you!</h3>
        <p className="text-gray-400 text-center mb-6">Your gateway to reaching common grounds</p>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-gray-700 hover:bg-gray-600 transition p-3 rounded-md font-semibold flex items-center justify-center space-x-2"
        >
          <img src={googleIcon} alt="Google" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>

        
      </motion.div>
    </div>
  );
};

export default AuthPage;
