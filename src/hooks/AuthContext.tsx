import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { toast } from "react-toastify";

// Create Auth Context
const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        toast.success(`Welcome back, ${currentUser.displayName || "User"}!`);
      } else {
        toast.info("You have been signed out.");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
