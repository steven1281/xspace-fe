import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, TEST_ORIGIN } from '@/components/config/config';
import { useChainId, useAccount, useSignMessage } from 'wagmi'
const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const chainId = useChainId();
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [refresh, setRefresh] = useState(false);

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

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, setAccessToken }}>
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