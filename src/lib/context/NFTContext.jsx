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
                    setNFTInfos(response.data.NftInfos)
                    console.log("nftlist: ", response.data.NftInfos)
                }
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


    const getNFTInfo = async (tokenID) => {
        if (!tokenID) return null;
        console.log("tokenID", tokenID)
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.get(API_URL.NFT_TWEET_INFO, {
                headers: { "Authorization": `Bearer ${accessToken}` },
                params: { tokenID: tokenID }
            });

            if (response.status === 200) {
                console.log("nftinfo: ", response.data)
                return response.data
            }

            return null;
        } catch (error) {
            console.error("NFT info error:", error);
            return null;
        }

    }


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