import {createContext, ReactNode, useState} from "react";

export const WalletContext = createContext({
    isAuthenticated: false,
    mentoAmount: 0,
    isInitialized: false,
    setMentoAmount: (value: number) => {},
    setIsAuthenticated: (value: boolean) => {},
    setIsInitialized: (value: boolean) => {}
});

export const WalletProvider = ({children}: { children: ReactNode }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [mentoAmount, setMentoAmount] = useState(0);

    return <WalletContext.Provider value={{
        isAuthenticated, setIsAuthenticated, mentoAmount, setMentoAmount, isInitialized, setIsInitialized
    }}>
        {children}
    </WalletContext.Provider>


}