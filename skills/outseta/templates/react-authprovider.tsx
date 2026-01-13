import { useEffect, useState, createContext, useContext, useRef, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

/*
 * Setting up a auth context to be used globally
 */

interface AuthContextType {
  user: unknown;
  isLoading: boolean;
  logout: () => void;
  openLogin: (options?: any) => void;
  openSignup: (options?: any) => void;
  openProfile: (options?: any) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

// Outseta is added to the window by the
// Outseta script added to the head in index.html
function getOutseta() {
  if (typeof window !== "undefined" && window.Outseta) {
    return window.Outseta;
  }
  return null;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState("init");
  const [user, setUser] = useState<unknown>(null);
  const outsetaRef = useRef<any>(null);

  useEffect(() => {
    const outseta = getOutseta();
    if (!outseta) return;
    outsetaRef.current = outseta;

    // Set up handling of user related events
    handleOutsetaUserEvents(updateUser);

    // Get the access token from the callback url
    const accessToken = searchParams.get("access_token");

    if (accessToken) {
      // If there is an acccess token present
      // pass it along to Outseta
      if (outsetaRef.current && typeof outsetaRef.current.setAccessToken === "function") {
        outsetaRef.current.setAccessToken(accessToken);
      }

      // and clean up
      setSearchParams({});
    }

    const checkAuth = async () => {
      try {
        const token = await outsetaRef.current?.getAccessToken();
        if (token) {
          await updateUser();
        } else {
          setStatus("ready");
        }
      } catch {
        setStatus("ready");
      }
    };

    checkAuth();

    return () => {
      // Clean up user related event subscriptions
      handleOutsetaUserEvents(() => {});
    };
  }, [searchParams, setSearchParams]);

  const updateUser = async () => {
    if (!outsetaRef.current) return;
    try {
      // Fetch the current user data from outseta
      const outsetaUser = await outsetaRef.current.getUser();
      // Update user state
      setUser(outsetaUser);
    } catch {
      setUser(null);
    } finally {
      // Make sure status = ready
      setStatus("ready");
    }
  };

  const handleOutsetaUserEvents = (onEvent: () => void) => {
    if (!outsetaRef.current) return;
    // Subscribe to user related events
    const outseta = outsetaRef.current;
    outseta.on("subscription.update", onEvent);
    outseta.on("profile.update", onEvent);
    outseta.on("account.update", onEvent);
  };

  const logout = () => {
    if (!outsetaRef.current) return;
    // Unset access token
    if (outsetaRef.current && typeof outsetaRef.current.setAccessToken === "function") {
      outsetaRef.current.setAccessToken("");
    }
    // and remove user state
    setUser(null);
    // Also call Outseta.logout() to clear cookies/session
    outsetaRef.current.logout();
  };

  const openLogin = (options: any = {}) => {
    if (!outsetaRef.current) return;
    outsetaRef.current.auth.open({
      widgetMode: "login|register",
      authenticationCallbackUrl: window.location.href,
      ...options,
    });
  };

  const openSignup = (options: any = {}) => {
    if (!outsetaRef.current) return;
    outsetaRef.current.auth.open({
      widgetMode: "register",
      authenticationCallbackUrl: window.location.href,
      ...options,
    });
  };

  const openProfile = (options: any = {}) => {
    if (!outsetaRef.current) return;
    outsetaRef.current.profile.open({ tab: "profile", ...options });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: status !== "ready",
        logout,
        openLogin,
        openSignup,
        openProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
