import { API_URL } from "@/components/config/config";
import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { useAccount } from "wagmi";

const PointContext = createContext();

export const PointProvider = ({ children }) => {
    const [historyPage, setHistoryPage] = useState(1);
    const [history, setHistory] = useState([
        {
            actionName: "-",
            point: 0,
            time: "-",
        }
    ]);

    const { isConnected } = useAccount();

    useEffect(() => {
        const PointHistory = async () => {
            const storeHistory = localStorage.getItem("history");
            if (storeHistory) {
                setHistory(JSON.parse(storeHistory));
            }
            const accessToken = localStorage.getItem("accessToken");
            console.log("ac: ", accessToken)
            try {
                const response = await axios.get(API_URL.POINT_HISTORY, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    params: {
                        page: historyPage,
                        size: 10,
                    },
                })

                if (response.status === 200) {
                    console.log("history: ", response.data)
                    setHistory(response.data.History);
                    localStorage.setItem("history", JSON.stringify(response.data.History));
                }
            } catch (error) {
                console.log(error);
            }

        }

        PointHistory();
    }, [isConnected]);

    return (
        <PointContext.Provider value={{ history }}>
            {children}
        </PointContext.Provider>
    );
}

export const usePoint = () => {
    const context = useContext(PointContext);

    if (!context) {
        throw new Error('usePoint must be used within a PointProvider');
    }

    return context;
}