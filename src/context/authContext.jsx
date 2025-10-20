import { createContext, useContext, useEffect, useState } from "react";
import supabase, { supabaseUrl } from "../supabase/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setAuthLoading(true);

    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!isMounted) return;
        const sessionData = data?.session ?? null;

        setSession(sessionData);
        setUser(sessionData?.user ?? null);
        sessionData?.user?.role === "authenticated";
      } catch (err) {
        console.error("Error fetching session:", err);
      } finally {
        if (isMounted) setAuthLoading(false);
      }
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);
        session?.user?.role === "authenticated";
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (name, email, password, profile_pic) => {
    setAuthLoading(true);
    setAuthError("");
    const fileName = `dp-${name
      .split(" ")
      .join("-")}-${Date.now()}-${Math.random()}`;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            profile_pic: `${supabaseUrl}/storage/v1/object/public/Profile_pic/${fileName}`,
          },
        },
      });

      if (error) {
        setAuthError(error.message);
        console.error("Error signing up:", error.message);
        return { success: false, data: error };
      }
      setSession(data.session);
      setUser(data.user);
      data.user.role === "authenticated";

      const { error: StorageError } = await supabase.storage
        .from("Profile_pic")
        .upload(fileName, profile_pic);

      if (StorageError) {
        setAuthError(StorageError.message);
        console.error("Error signing up:", StorageError.message);
        return { success: false, data: StorageError };
      }

      return { success: true, data };
    } catch (err) {
      setAuthError(err.message);

      console.error("Error signing up:", err.message);
      return { success: false, data: err };
    } finally {
      setAuthLoading(false);
    }
  };

  const logIn = async (email, password) => {
    setAuthLoading(true);
    setAuthError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
        console.error("Error logging in:", error.message);
        return { success: false, data: error };
      }

      setSession(data.session);
      setUser(data.user);
      data.user?.role === "authenticated";

      return { success: true, data };
    } catch (err) {
      setAuthError(err.message);

      console.error("Catch block Error logging in:", err.message);
      return { success: false, data: err };
    } finally {
      setAuthLoading(false);
    }
  };

  const logOut = async () => {
    setAuthLoading(true);
    setAuthError("");

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setAuthError(error.message);
        console.error("Error logging out:", error.message);
        return { success: false, data: error };
      }
      setSession(null);
      setUser(null);
      false;

      return { success: true, data: "Logged Out successfully" };
    } catch (err) {
      setAuthError(err.message);

      console.error("Error logging out:", err.message);
      return { success: false, data: err };
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signUp,
        logIn,
        logOut,
        authLoading,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
