import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const allowedUsers = import.meta.env.VITE_OWNER_EMAIL_IDS.split(",");
  const usersLowerCase = allowedUsers.map((item: string) => item.toLowerCase())

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthorized(currentUser && usersLowerCase.includes(currentUser.email?.toLowerCase()));
    });

    return () => unsubscribe();
  }, []);

  return { user, isAuthorized };
};

export default useAuth;
