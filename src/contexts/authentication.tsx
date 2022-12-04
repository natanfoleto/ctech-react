import React, { createContext, useCallback, useContext, useState } from "react";

import { signInRequest, ISignInRequest, IUser } from "../services/authenticate";

import api from "../services/api";

import usePersistedState from "../hooks/usePersistedState";

interface UpdateUserState {
  name: string;
  phone: string;
}

interface SignInResponse {
  status: string;
  message: string;
}

interface AuthContextType {
  signed: boolean;
  loading: boolean;
  token: string;
  user: Partial<IUser> | null;
  updateUserState(data: UpdateUserState): void;
  signIn(data: ISignInRequest): Promise<SignInResponse>;
  signOut(): void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = usePersistedState<IUser | null>("user", null);
  const [token, setToken] = usePersistedState<string>("token", "");

  function updateUserState({ name, phone }: UpdateUserState): void {
    if (user)
      setUser({
        ...user,
        name,
        phone,
      });
  }

  const signIn = useCallback(
    async (params: ISignInRequest): Promise<SignInResponse> => {
      setLoading(true);

      try {
        const { status, message, data } = await signInRequest(params);

        if (status === "success") {
          setUser(data.user);
          setToken(data.token);

          api.defaults.headers["authorization"] = `Bearer ${data.token}`;

          setLoading(false);
        }

        if (status === "error") setLoading(false);

        return { status, message };
      } catch (err: any) {
        setLoading(false);
        return { status: "error", message: err.message };
      }
    },
    []
  );

  function signOut() {
    localStorage.clear();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loading,
        token,
        user,
        updateUserState,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
