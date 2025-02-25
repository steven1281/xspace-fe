import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, TEST_ORIGIN } from '@/components/config/config';
import { useChainId, useAccount, useSignMessage } from 'wagmi'
import { challenge, checkExpire, getToken, login, setToken } from '@/components/storage/token';
const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();


    // useEffect()


    // useEffect(() => {
    //     if (address != null && accessToken == null && refreshToken == null) {
    //         const Login = async () => {
    //             const challengeResponse = await axios.get(`${API_URL.Challenge}?address=${address}&chainid=${chainId}`, {
    //                 headers: {
    //                     'Origin': TEST_ORIGIN
    //                 }
    //             });
    //             if (challengeResponse.status === 200) {
    //                 const message = challengeResponse.data
    //                 const signature = await signMessageAsync({ message });
    //                 const loginResponse = await axios.post(`${API_URL.Login}`, {
    //                     message,
    //                     signature
    //                 });
    //                 if (loginResponse.status === 200) {
    //                     setAccessToken(loginResponse.data.accessToken);
    //                     setRefreshToken(loginResponse.data.refreshToken);

    //                     console.log("ac", accessToken)
    //                     console.log("re", refreshToken)
    //                 }

    //             }

    //         }

    //         Login();
    //     }
    // }, [isConnected]);

    const Login = async () => {
        try {
            if (isConnected) {
                console
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