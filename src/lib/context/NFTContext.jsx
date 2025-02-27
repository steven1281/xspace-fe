import { API_URL } from "@/components/config/config";
import axios from "axios";
import { createContext, useEffect, useState, useContext, useCallback } from "react";
import { useAccount } from "wagmi";


const NFTContext = createContext();

export const NFTProvider = ({ children }) => {
    const { isConnected } = useAccount();

    const [NFTInfos, setNFTInfos] = useState([]);
    const [NFTpage, setNFTpage] = useState(1);
    const [abortController, setAbortController] = useState(new AbortController());

    const clearNFTData = useCallback(() => {
        setNFTInfos([]);
        localStorage.removeItem("NFTInfos");
    }, []);

    const getNFTList = useCallback(async () => {
        const newAbortController = new AbortController();
        setAbortController(newAbortController);

        try {
            const accessToken = localStorage.getItem("accessToken");
            if (isConnected && accessToken) {
                const response = await axios.get(API_URL.NFT_LIST, {
                    headers: { "Authorization": `Bearer ${accessToken}` },
                    params: { page: NFTpage, size: 10 },
                    signal: newAbortController.signal
                })
                if (response.status === 200) {
                    setNFTInfos(response.data.nftInfos)
                    localStorage.setItem("NFTInfos", JSON.stringify(response.data.nftInfos));
                }
            } else {
                const stored = localStorage.getItem("NFTInfos");
                if (stored) setNFTInfos(JSON.parse(stored));
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
                return;
            }
            if (error.response) {
                console.error('Server responded with error status:', {
                    status: error.response.status,
                    data: error.response.data
                });
                if (error.response.status === 401) {
                    // localStorage.removeItem("accessToken");
                }
            } else if (error.request) {
                console.error('No response received:', error.request);
            }
        }
    }, [isConnected, NFTpage])

    useEffect(() => {
        getNFTList();
        return () => abortController.abort();
    }, [getNFTList])

    useEffect(() => {
        if (!isConnected) clearNFTData();
    }, [isConnected, clearNFTData]);


    const getNFTInfo = useCallback(async (tokenID) => {
        if (!tokenID) return null;

        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.get(API_URL.NFT_TWEET_INFO, {
                headers: { "Authorization": `Bearer ${accessToken}` },
                params: { tokenID: tokenID }
            });

            return response.status === 200 ? response.data : null;
        } catch (error) {
            console.error("NFT info error:", error);
            return null;
        }

    }, [])


    return (
        <NFTContext.Provider value={{ NFTInfos, getNFTInfo }}>
            {children}
        </NFTContext.Provider>
    )
}

export const useNFT = () => {
    const context = useContext(NFTContext);

    if (!context) {
        throw new Error('useNFT must be used within a NFTProvider');
    }

    return context;
}