import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, TEST_ORIGIN } from '@/components/config/config';
import { useChainId, useAccount, useSignMessage } from 'wagmi'
import { challenge, checkExpire, getToken, login, setToken } from '@/components/storage/token';
const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const Login = async () => {
        try {
            if (isConnected) {
                const message = await challenge(address);
                const signature = await signMessageAsync({ message });
                const { accessToken, refreshToken } = await login(message, signature);
                setToken(accessToken, refreshToken);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const autoLogin = async () => {
        if (checkExpire()) {
            Login();
            console.log("login")
        } else {
            const { newAccessToken, refreshToken } = await getToken();
            if (newAccessToken && refreshToken) {
                setToken(newAccessToken, refreshToken);
            }
            console.log("refresh token: ", newAccessToken)
        }
    }
    useEffect(() => {
        autoLogin();
    }, [isConnected, address])

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}