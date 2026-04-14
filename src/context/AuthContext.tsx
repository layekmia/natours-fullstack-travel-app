import { AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { authAPI } from "../api/auth";
import { usersAPI } from "../api/users";
import { ApiResponse, SignUpData, User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (
    formData: FormData,
  ) => Promise<{ success: boolean; error?: string; user?: User }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<void> => {
    try {
      const response = await usersAPI.getMe();
      console.log(response);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({
        email,
        password,
      });

      setUser(response.data);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      const err = error as AxiosError<ApiResponse<any>>;
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  const signup = async (data: SignUpData) => {
    try {
      const response = await authAPI.signup(data);

      setUser(response.data);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      const err = error as AxiosError<ApiResponse<any>>;
      return {
        success: false,
        error: err.response?.data?.message || "Signup failed",
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authAPI.logout();
    } catch {
      // ignore error
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = async (formData: FormData) => {
    console.log(FormData);
    try {
      const response = await usersAPI.updateMe(formData);
      console.log(response);
      const updatedUser = response.data;
      console.log(updatedUser);
      setUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (error) {
      console.log(error)
      const err = error as AxiosError<ApiResponse<any>>;
      return {
        success: false,
        error: err.response?.data?.message || "Update failed",
      };
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
