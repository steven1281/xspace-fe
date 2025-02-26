import { API_URL } from "@/components/config/config";
import axios from "axios";
import { useContext, createContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const { isConnected } = useAccount();

    const getUserInfo = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const storeUserInfo = localStorage.getItem("useInfo");
        if (storeUserInfo) {
            setUserInfo(JSON.parse(storeUserInfo));
        }
        try {
            const response = await axios.get(API_URL.USER_INFO, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            })

            if (response.status === 200) {
                setUserInfo(response.data)
                console.log("userInfo:", response.data.InviteCode)
                localStorage.setItem("userInfo", JSON.stringify(response.data));
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [isConnected])

    return (
        <UserContext.Provider value={{ userInfo }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}