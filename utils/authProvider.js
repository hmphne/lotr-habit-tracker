import React, { createContext, useState, useEffect } from "react";
import { supabase } from "./supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check the current session when the app starts
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user);
    };

    fetchSession();

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
