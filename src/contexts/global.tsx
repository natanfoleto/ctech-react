import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface GlobalContextType {
  global: boolean;
  setGlobal: Dispatch<SetStateAction<boolean>>;
}

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [global, setGlobal] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        global,
        setGlobal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

function useGlobal(): GlobalContextType {
  return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal };
