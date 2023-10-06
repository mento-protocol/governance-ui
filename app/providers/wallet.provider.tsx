"use client";
import {createContext, useContext, useState} from "react";
import BaseComponentProps from "@interfaces/base-component-props.interface";

const WalletContext = createContext({
    wallet: '',
    setWallet: (value: string) => {
    }
});

export const WalletProvider = (props: BaseComponentProps) => {
    const [wallet, setWallet] = useState('');

    return (
        <WalletContext.Provider value={{ wallet, setWallet }}>
            {props.children}
        </WalletContext.Provider>
    );
}

export const useWalletContext = () => useContext(WalletContext);