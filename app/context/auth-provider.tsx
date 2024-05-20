/* eslint-disable react-hooks/exhaustive-deps */

import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { AuthContextType } from "./auth.model";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as User);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const context = useMemo(
    () => ({
      user,
      loginUser,
      logOut,
      loading,
    }),
    [user, loginUser, logOut, loading]
  );

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};
