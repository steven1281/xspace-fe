import { API_URL } from "@/components/config/config";
import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { useAccount } from "wagmi";


const NFTContext = createContext();

export const NFTProvider = ({ children }) => {
    const { isConnected } = useAccount();

    const [NFTInfos, setNFTInfos] = useState([
        {

        }
    ]);
    const [NFTpage, setNFTpage] = useState(1);

    const getNFTList = async () => {
        try {
            // const storeNFTInfos = localStorage.getItem("NFTInfos");
            // if (storeNFTInfos) {
            //     setNFTInfos(JSON.parse(storeNFTInfos));
            // }
            const accessToken = localStorage.getItem("accessToken");
            console.log("accessToken", accessToken)
            if (isConnected) {
                const response = await axios.get(API_URL.NFT_LIST, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                    params: {
                        page: NFTpage,
                        size: 10
                    }
                })
                if (response.status === 200) {
                    console.log("NFT_LIST", response.data)
                    setNFTInfos(response.data.nftInfos)
                    localStorage.setItem("NFT_LIST", JSON.stringify(response.data.nftInfos));
                }
            }
        } catch (error) {
            console.error(error)
        }
    }


    const getNFTInfo = async (tokenID) => {
        if (tokenID !== undefined) {
            try {
                console.log("tokenID", tokenID)
                const accessToken = localStorage.getItem("accessToken");

                const response = await axios.get(API_URL.NFT_TWEET_INFO, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                    params: {
                        tokenID: tokenID
                    }
                })
                if (response.status === 200) {
                    console.log("getNFTInfo: ", response.data)
                    return response.data
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getNFTList()
    }, [isConnected])


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