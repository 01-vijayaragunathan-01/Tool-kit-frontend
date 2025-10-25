import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthResponse {
  success: boolean;
  token: string;
  user: any; // Use 'any' for flexibility with backend response
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper function to normalize user data from backend
  const normalizeUser = (userData: any): User => {
    // Handle both 'id' and '_id' from backend
    const userId = userData.id || userData._id;
    
    return {
      id: String(userId), // Ensure it's always a string
      name: userData.name,
      email: userData.email,
      role: userData.role,
    };
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get<{ success: boolean; user: any }>(
            "/auth/me"
          );
          
          const userData = normalizeUser(response.data.user);
          setUser(userData);
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      const { token, user: userData } = response.data;
      localStorage.setItem("token", token);
      
      const normalizedUser = normalizeUser(userData);
      setUser(normalizedUser);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await api.post<AuthResponse>("/auth/signup", {
        name,
        email,
        password,
      });
      const { token, user: userData } = response.data;
      localStorage.setItem("token", token);
      
      const normalizedUser = normalizeUser(userData);
      setUser(normalizedUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};